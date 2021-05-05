import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DaysJsDateProvider } from './implementations/DayJsDateProvider';

container.registerSingleton<IDateProvider>(
  'DaysJsDateProvider',
  DaysJsDateProvider,
);
