import { User } from './user.interface';

export interface AuthUser extends User {
  _id?: string;
  passwordHash: string;
}