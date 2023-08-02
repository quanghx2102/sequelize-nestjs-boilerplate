import { User } from '../modules/users/entities/user.entity';
import { USER_REPOSITORY } from './database.constants';

export const providerGlobals = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
