import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from '@project/shared/types';

import { BasePostgresRepository } from '@project/shared/core';
import { LikeEntity } from './like.entity';
import { PrismaClientService } from '@project/shared/blog/models';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, LikeEntity.fromObject);
  }

  public async save(entity: LikeEntity): Promise<LikeEntity> {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    return entity;
  }

  public async find(postId: string, userId): Promise<LikeEntity> {
    const document = await this.client.like.findFirst({
      where: {
        postId,
        userId
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async delete(postId: string, userId): Promise<void> {
    await this.client.like.deleteMany({
      where: {
        postId,
        userId
      },
    });
  }


}