import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Criar Controlador de Listagem de Categoria', () => {
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

  it('Deve ser possível listar as categorias', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@rentx.com.br',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    await request(app).post('/categories').send({
      name: 'Category 2 Supertest',
      description: 'Category 2 Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    await request(app).post('/categories').send({
      name: 'Category  Supertest',
      description: 'Category  Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category 2 Supertest');
    expect(response.body[0].description).toEqual('Category 2 Supertest');
  });
});
