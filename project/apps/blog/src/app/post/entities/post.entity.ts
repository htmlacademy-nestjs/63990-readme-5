import { Entity } from '@project/shared/core'
import { Like, Post, PostStatus, PostType, Tag } from '@project/shared/types'
import { BlogTagEntity } from '../../tag/tag.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { LikeEntity } from '../../like/like.entity';
// import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';

export class PostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public tags: BlogTagEntity[];
  public status: PostStatus;
  public userId: string;
  public type: PostType;
  public createdAt?: Date;
  public updatedAt?: Date;
  public title?: string;
  public text?: string;
  public preview?: string;
  public photo?: string;
  public like?: boolean;
  // public comments: BlogCommentEntity[];

  // constructor(post: Post) {
  //   this.populate(post);
  // }

  public populate(post: Post): PostEntity {
    this.id = post.id;
    this.tags = post.tags.map((tag) => BlogTagEntity.fromObject(tag));;
    this.status = post.status;
    this.userId = post.userId;
    this.type = post.type;
    // this.comments = [];
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;

    if (post.type === 'text') {
      this.title =  post.title ?? undefined;
      this.text =  post.text ?? undefined;
      this.preview = post.preview ?? undefined;
    }

    if (post.type === 'photo') {
      this.photo =  post.photo ?? undefined;
    }

    this.like = post.like;

    return this;
  }

  public toPOJO(): Post {
    let pojo: Post = {
      id: this.id,
      status: this.status,
      userId: this.userId,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      // comments: [],
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
      like: this.like
    }

    if (this.type === 'text') {
      pojo = {
        ...pojo,
        title: this.title,
        text: this.text,
        preview: this.preview,
      }
    }

    if (this.type === 'photo') {
      pojo.photo = this.photo
    }

    return pojo;
  }

  static fromObject(data: Post): PostEntity {
    return new PostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): PostEntity {
    const entity = new PostEntity();

    entity.tags = tags;
    entity.userId = dto.userId;
    entity.type = dto.type;
    entity.status = dto.status;

    if (dto.type === 'text') {
      entity.title = dto.title;
      entity.text = dto.title;
      entity.preview = dto.title;
    }

    if (dto.type === 'photo') {
      entity.photo = dto.photo;
    }
    // entity.comments = [];

    return entity;
  }
}