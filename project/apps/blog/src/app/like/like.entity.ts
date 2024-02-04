import { Like } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class LikeEntity implements Like, Entity<string, Like> {
  public id?: string;
  public userId: string;
  public postId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Like) {
    this.populate(data);
  }

  public populate(data: Like): void {
    this.id = data.id ?? undefined;
    this.postId = data.postId ?? undefined;
    this.userId = data.userId ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: Like): LikeEntity {
    return new LikeEntity(data);
  }
}