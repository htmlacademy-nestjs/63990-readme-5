import { Entity } from '@project/libs/core'
import { PhotoPost } from '@project/libs/shared-types'
import { BasePostEntity } from './base-post.entity';

export class PhotoPostEntity extends BasePostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public photo: string;

  public populate(post: PhotoPost): void {
    super.populate(post);

    this.photo = post.photo;
  }

  public toPOJO(): PhotoPost {
    const basePost = super.toPOJO();

    return {
      ...basePost,
      photo: this.photo
    }
  }

  static fromObject(data: PhotoPost): PhotoPostEntity {
    return new PhotoPostEntity(data);
  }
}