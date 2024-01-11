import { Entity } from '@project/shared/core'
import { TextPost } from '@project/shared/types'
import { BasePostEntity } from './base-post.entity';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { BlogTagEntity } from '../../tag/tag.entity';

export class TextPostEntity extends BasePostEntity implements TextPost, Entity<string, TextPost> {
  public title: string;
  public preview: string;
  public text: string;

  public populate(post: TextPost): TextPostEntity {
    super.populate(post);

    this.title = post.title;
    this.preview = post.preview;
    this.text = post.text;

    return this;
  }

  public toPOJO(): TextPost {
    const basePost = super.toPOJO();

    return {
      ...basePost,
      title: this.title,
      preview: this.preview,
      text: this.text
    }
  }

  static fromObject(data: TextPost): TextPostEntity {
    return new TextPostEntity().populate(data);
  }

  static fromDto(dto: CreateTextPostDto, tags: BlogTagEntity[]): TextPostEntity {
    const entity = new TextPostEntity();

    entity.tags = tags;
    entity.userId = dto.userId;
    entity.type = dto.type;
    entity.status = dto.status;
    entity.title = dto.title;
    entity.text = dto.text;
    entity.preview = dto.preview;

    // entity.comments = [];

    return entity;
  }
}