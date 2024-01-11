import { Entity } from '@project/shared/core'
import { PhotoPost } from '@project/shared/types'
import { BasePostEntity } from './base-post.entity';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { BlogTagEntity } from '../../tag/tag.entity';

export class PhotoPostEntity extends BasePostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public photo: string;

  public populate(post: PhotoPost): PhotoPostEntity {
    super.populate(post);

    this.photo = post.photo;

    return this;
  }

  public toPOJO(): PhotoPost {
    const basePost = super.toPOJO();

    return {
      ...basePost,
      photo: this.photo
    }
  }

  static fromObject(data: PhotoPost): PhotoPostEntity {
    return new PhotoPostEntity().populate(data);
  }

  
  static fromDto(dto: CreatePhotoPostDto, tags: BlogTagEntity[]): PhotoPostEntity {
    const entity = new PhotoPostEntity();

    entity.tags = tags;
    entity.userId = dto.userId;
    entity.type = dto.type;
    entity.status = dto.status;
    entity.photo = dto.photo;

    // entity.comments = [];

    return entity;
  }
}