import { Entity } from '@project/libs/core'
import { TextPost } from '@project/libs/shared-types'
import { BasePostEntity } from './base-post.entity';

export class TextPostEntity extends BasePostEntity implements TextPost, Entity<string, TextPost> {
  public title: string;
  public preview: string;
  public text: string;

  public populate(post: TextPost): void {
    super.populate(post);

    this.title = post.title;
    this.preview = post.preview;
    this.text = post.text;
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
    return new TextPostEntity(data);
  }
}