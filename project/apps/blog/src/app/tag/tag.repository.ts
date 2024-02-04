import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from '@project/shared/types';

import { BasePostgresRepository } from '@project/shared/core';
import { BlogTagEntity } from './tag.entity';
import { PrismaClientService } from '@project/shared/blog/models';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity, Tag> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogTagEntity.fromObject);
  }

  public async save(entity: BlogTagEntity): Promise<BlogTagEntity> {
    const record = await this.client.tags.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<BlogTagEntity> {
    const document = await this.client.tags.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByTitle(title: string): Promise<BlogTagEntity> {
    const document = await this.client.tags.findFirst({
      where: {
        title,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tags.delete({
      where: {
        id,
      }
    });
  }

  public async update(id: string, entity: BlogTagEntity): Promise<BlogTagEntity> {
    const updatedTag = await this.client.tags.update({
      where: { id },
      data: {
        title: entity.title,
      }
    });

    return this.createEntityFromDocument(updatedTag);
  }

  public async findByIds(ids: string[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tags.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}