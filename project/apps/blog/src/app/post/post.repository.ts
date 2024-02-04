import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/blog/models';
import { BasePostgresRepository } from '@project/shared/core';
import { PostFilter, postFilterToPrismaFilter } from './post.filter';
import { MAX_POST_LIMIT, SEARCH_POST_COUNT_LIMIT } from './post.constant';
import { Prisma } from '@prisma/client';
import { BlogPostQuery } from './query/post.query';
import { PaginationResult, Post } from '@project/shared/types';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostEntity.fromObject);
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
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
        },
        like: {}
      }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PostEntity> {
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

  
  public async findRepost(originalId: string, userId): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        originalId,
        userId
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

  public async find(query?: BlogPostQuery, userId?: string): Promise<PaginationResult<PostEntity>> {
    const take = query.search ? SEARCH_POST_COUNT_LIMIT : query?.limit;
    const skip = query?.page && take ? (query.page - 1) * take : undefined;

    const where: Prisma.PostWhereInput = {
      status: 'published'
    };
    let orderBy: Prisma.PostOrderByWithRelationInput = {
      createdAt: query.sortDirection ?? 'desc'
    };
    const likeWhere: Prisma.LikeWhereInput = {}

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags
          }
        }
      }
    }

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query.sortBy && query.sortBy !== 'createdAt') {
      orderBy = {
        [query.sortBy]: {
          _count: query.sortDirection
        }
      }
    }

    if (query?.search) {
      where.title = {
        contains: query.search
      };
    }

    if (userId) {
      likeWhere.userId = userId
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ 
        where, 
        orderBy, 
        skip, 
        take,
        include: {
          tags: true,
          comments: true,
          like: userId ? { where: likeWhere } : undefined,
          _count: {
            select: { like: true, comments: true },
          },
        },
      }),

      this.getPostCount(where),
    ]);

    // console.log(records)

    return {
      entities: records.map((record) => this.createEntityFromDocument({
        ...record,
        like: !!record.like?.length,
        likesCount: record._count.like,
        commentsCount: record._count.comments
      })),
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

  public async update(id: string, entity: PostEntity): Promise<PostEntity> {
    const pojoEntity = entity.toPOJO();

    const updatedData: Pick<Post, 'title' | 'text' | 'preview' | 'photo'> = {};

    if (entity.type === 'text') {
      updatedData.title = entity.title;
      updatedData.text = entity.text;
      updatedData.preview = entity.preview;
    }

    if (entity.type === 'photo') {
      updatedData.photo = entity.photo;
    }

    const updatedPost = await this.client.post.update({
      where: { id },
      data: {
        tags: {
          set: pojoEntity.tags.map((tag) => ({ id: tag.id })),
        },
        type: entity.type,
        status: entity.status,
        ...updatedData
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }
}