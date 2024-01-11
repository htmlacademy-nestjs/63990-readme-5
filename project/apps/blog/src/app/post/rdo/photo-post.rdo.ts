import { Expose } from 'class-transformer';
import { PostRdo } from './post.rdo';

export class PhotoPostRdo extends PostRdo {
  @Expose()
  public photo: string;
}