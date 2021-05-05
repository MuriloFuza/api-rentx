import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Criar Controlador de Categoria', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
          values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX') 
        `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Deve ser possível criar uma nova categoria', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@rentx.com.br',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const response = await request(app).post('/categories/').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.status).toBe(201);
  });

  it('Não deve ser capaz de criar uma categoria com nome já existente', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@rentx.com.br',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    await request(app).post('/categories/').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).post('/categories/').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.status).toBe(400);
  });
});
