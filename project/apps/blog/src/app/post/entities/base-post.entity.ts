import { Entity } from '@project/libs/core'
import { Post, PostStatus, PostType } from '@project/libs/shared-types'

export class BasePostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public tags: string[];
  public status: PostStatus;
  public userId: string;
  public type: PostType;

  constructor(post: Post) {
    this.populate(post);
  }

  public populate(post: Post): void {
    this.id = post.id;
    this.tags = post.tags;
    this.status = post.status;
    this.userId = post.userId;
    this.type = post.type;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      tags: this.tags,
      status: this.status,
      userId: this.userId,
      type: this.type
    }
  }

  static fromObject(data: Post): BasePostEntity {
    return new BasePostEntity(data);
  }
}