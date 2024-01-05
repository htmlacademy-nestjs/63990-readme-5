import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog/models';
import { BasePostgresRepository } from '@project/libs/core';
import { PostEntityType, PostType } from './post.type';
import { createEntity } from './entities/create-entity';
import { PostFilter, postFilterToPrismaFilter } from './post.filter';
import { MAX_POST_LIMIT } from './post.constant';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntityType, PostType> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, createEntity);
  }

  public async save(entity: PostEntityType): Promise<PostEntityType> {
    const record = await this.client.post.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PostEntityType> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: PostFilter): Promise<PostEntityType[]> {
    const where = filter ?? postFilterToPrismaFilter(filter);

    const documents = await this.client.post.findMany({
      where,
      take: MAX_POST_LIMIT
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }

  public async update(id: string, entity: PostEntityType): Promise<PostEntityType> {
    const updatedPost = await this.client.post.update({
      where: { id },
      data: {
        ...entity.toPOJO()
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }
}