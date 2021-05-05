import { container } from 'tsyringe';

import { LocalStorageProvider } from './Implementations/LocalStorageProvider';
import { S3StorageProvider } from './Implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'LocalStorageProvider',
  diskStorage[process.env.disk],
);
