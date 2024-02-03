import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { CommentEntity } from './comment.entity';
import { PrismaClientService } from '@project/shared/blog/models';
import { Comment } from '@project/shared/types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MAX_COMMENTt_LIMIT } from './comment.constant';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, CommentEntity.fromObject);
  }

  public async save(entity: CommentEntity) {
    const newComment = await this.client.comment.create({
      data: {
        message: entity.message,
        userId: entity.userId,
        postId: entity.postId
      }
    });

    entity.id = newComment.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: string): Promise<CommentEntity> {
    const comment = await this.client.comment.findFirst({
      where: {
        id
      },
      take: MAX_COMMENTt_LIMIT
    });

    if (! comment) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(comment);
  }

  public async findByPostId(postId: string, query?: CommentQuery): Promise<CommentEntity[]> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;

    const comments = await this.client.comment.findMany({
      where: {
        postId
      },
      skip,
      take
    })

    return comments.map((comment) => this.createEntityFromDocument(comment))
  }
}