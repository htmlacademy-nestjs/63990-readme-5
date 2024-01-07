import { Entity } from '@project/shared/core'
import { Post, PostStatus, PostType, Tag } from '@project/shared/types'
import { BlogTagEntity } from '../../tag/tag.entity';
import { CreatePostDto } from '../dto/create-post.dto';
// import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';

export class BasePostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public tags: BlogTagEntity[];
  public status: PostStatus;
  public userId: string;
  public type: PostType;
  public createdAt?: Date;
  public updatedAt?: Date;
  // public comments: BlogCommentEntity[];

  // constructor(post: Post) {
  //   this.populate(post);
  // }

  public populate(post: Post): BasePostEntity {
    this.id = post.id;
    this.tags = post.tags.map((tag) => BlogTagEntity.fromObject(tag));;
    this.status = post.status;
    this.userId = post.userId;
    this.type = post.type;
    // this.comments = [];
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;

    return this;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      status: this.status,
      userId: this.userId,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      // comments: [],
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
    }
  }

  static fromObject(data: Post): BasePostEntity {
    return new BasePostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): BasePostEntity {
    const entity = new BasePostEntity();

    entity.tags = tags;
    entity.userId = dto.userId;
    entity.type = dto.type;
    entity.status = dto.status;
    // entity.comments = [];

    return entity;
  }
}