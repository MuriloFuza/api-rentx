import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayLoad{
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DaysJsDateProvider')
    private daysJsDateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayLoad;

    const user_id = sub;

    const userTokens = await this.usersTokensRepository.findByIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userTokens) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userTokens.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.daysJsDateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
