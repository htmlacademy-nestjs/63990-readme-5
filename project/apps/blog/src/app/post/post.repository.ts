import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/blog/models';
import { BasePostgresRepository } from '@project/shared/core';
import { PostEntityType, PostType } from './post.type';
import { createEntity } from './entities/create-entity';
import { PostFilter, postFilterToPrismaFilter } from './post.filter';
import { MAX_POST_LIMIT } from './post.constant';
import { Prisma } from '@prisma/client';
import { BlogPostQuery } from './query/post.query';
import { PaginationResult } from '@project/shared/types';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntityType, PostType> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, createEntity);
  }

  public async save(entity: PostEntityType): Promise<PostEntityType> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: {
          connect: pojoEntity.tags
            .map(({ id }) => ({ id }))
        },
        comments: {
          connect: []
        }
      }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PostEntityType> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(document);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query?: BlogPostQuery): Promise<PaginationResult<PostEntityType>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags
          }
        }
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          tags: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async update(id: string, entity: PostEntityType): Promise<PostEntityType> {
    const pojoEntity = entity.toPOJO();
    const updatedPost = await this.client.post.update({
      where: { id },
      data: {
        tags: {
          set: pojoEntity.tags.map((tag) => ({ id: tag.id })),
        },
        type: entity.type,
        status: entity.status,
        // TODO: fields by post type
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }
}