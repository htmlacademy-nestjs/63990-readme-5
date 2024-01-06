import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public tags: string[];

  @Expose()
  public userId: string;

  @Expose()
  public status: string[];

  @Expose()
  public type: string[];
}