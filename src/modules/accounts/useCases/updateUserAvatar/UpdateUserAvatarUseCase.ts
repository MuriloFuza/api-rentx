import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { deleteFile } from '@utils/file';

interface IRequest {
    user_id: string;
    avatarFIle: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('LocalStorageProvider')
    private localStorageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatarFIle }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.localStorageProvider.delete(user.avatar, 'avatar');
    }

    await this.localStorageProvider.save(avatarFIle, 'avatar');

    user.avatar = avatarFIle;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
