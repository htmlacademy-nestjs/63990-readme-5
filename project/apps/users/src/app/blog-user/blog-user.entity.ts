import { AuthUser } from '@project/libs/shared-types'
import { Entity } from '@project/libs/core'
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public fullname: string;
  public avatarPath?: string;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public populate(user: AuthUser): void {
    this.id = user.id;
    this.email = user.email;
    this.fullname = user.fullname;
    this.avatarPath = user.avatarPath;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      avatarPath: this.avatarPath,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash)
  }

  static fromObject(data: AuthUser): BlogUserEntity {
    return new BlogUserEntity(data);
  }
}