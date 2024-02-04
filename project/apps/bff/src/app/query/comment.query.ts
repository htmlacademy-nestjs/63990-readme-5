import { Transform } from 'class-transformer';
import { IsNumber, IsOptional} from 'class-validator';
import { DEFAULT_PAGE_COUNT, MAX_COMMENTt_LIMIT } from '../comment.constant';

export class CommentQuery {
  @Transform(({ value }) => +value || MAX_COMMENTt_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = MAX_COMMENTt_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}