import { PostType } from '@project/shared/types';
import { Expose, Type } from 'class-transformer';
import { TagRdo } from '../../tag/rdo/tag.rdo';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  @Type(() => TagRdo)
  public categories: TagRdo[];

  @Expose()
  public userId: string;

  @Expose()
  public status: string[];

  @Expose()
  public type: PostType;
}