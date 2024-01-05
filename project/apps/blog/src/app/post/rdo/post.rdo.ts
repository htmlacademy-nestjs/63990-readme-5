import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public tags: string[];
}