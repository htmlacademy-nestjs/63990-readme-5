import { Expose } from 'class-transformer';
import { PostRdo } from './post.rdo';

export class TextPostRdo extends PostRdo {
  @Expose()
  public title: string;

  @Expose()
  public preview: string;

  @Expose()
  public text: string;
}