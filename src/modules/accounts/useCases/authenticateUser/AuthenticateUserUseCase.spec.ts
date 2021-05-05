import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';
import { DaysJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUserCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUserCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DaysJsDateProvider;

describe('Autenticação do usuário', () => {
  beforeEach(() => {
    dateProvider = new DaysJsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUserCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Deve ser capaz de autenticar um usuário', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001234',
      email: 'user@jest.com',
      password: '1234',
      name: 'userJest',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Não deve ser capaz de autenticar um usuário inexistente', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'dickvigarista@jest.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('Não deve ser capaz de autenticar um usuário com a senha incorreta', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001234',
      email: 'user2@jest.com',
      password: '1234',
      name: 'userJest2',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '1235',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
