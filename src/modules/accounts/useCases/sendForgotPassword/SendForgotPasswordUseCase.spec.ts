import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DaysJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/InMemory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordUseCase } from './SendForgotPasswordUseCase';

let sendForgotPasswordUseCase: SendForgotPasswordUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DaysJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Enviar email de recuperação de senha', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DaysJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('Deve ser possível enviar um email de esqueceu sua senha para o email do usuário', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '991474',
      email: 'jusotuti@mug.pr',
      name: 'Gene Harper',
      password: '1234',
    });

    await sendForgotPasswordUseCase.execute('jusotuti@mug.pr');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Não deve ser possível enviar um email de esqueceu sua senha para o email do usuário caso ele não exista', async () => {
    await expect(
      sendForgotPasswordUseCase.execute('bo@pecuh.ge'),
    ).rejects.toEqual(new AppError('Users does not exists!'));
  });

  it('Deve ser possível criar um token de usuário', async () => {
    const generate = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '735219',
      email: 'ita@nin.bz',
      name: 'Phillip George',
      password: '1235',
    });

    await sendForgotPasswordUseCase.execute('ita@nin.bz');

    expect(generate).toHaveBeenCalled();
  });
});
