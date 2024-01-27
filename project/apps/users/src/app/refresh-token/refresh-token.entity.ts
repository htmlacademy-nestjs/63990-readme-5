import { Entity } from '@project/shared/core';
import { Token } from '@project/shared/types';


export class RefreshTokenEntity implements Entity<string>, Token {
  public createdAt: Date;
  public expiresIn: Date;
  public id: string;
  public tokenId: string;
  public userId: string;
  [key: string]: unknown;

  constructor(refreshToken: Token) {
    this.createdAt = new Date;
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }

  
  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      tokenId: this.tokenId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
    }
  }

}