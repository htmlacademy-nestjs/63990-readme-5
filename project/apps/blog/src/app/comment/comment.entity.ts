import { Entity } from '@project/shared/core';
import { Comment } from '@project/shared/types';
import { CreateCommentDto } from './dto/create-comment.dto';


export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public userId: string;
  public message: string;
  public createdAt: Date;
  public updatedAt: Date;
  public postId?: string;

  public populate(data: Comment): CommentEntity {
    this.id = data.id ?? undefined;
    this.message = data.message;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.postId = data.postId;

    return this;
  }

  public toPOJO() {
    return {
      id: this.id,
      message: this.message,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
    }
  }

  static fromObject(data: Comment) {
    return new CommentEntity().populate(data);
  }

  static fromDto(dto: CreateCommentDto, postId: string) {
    const entity = new CommentEntity();

    entity.populate({
      ...dto,
      postId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return entity;
  }
}