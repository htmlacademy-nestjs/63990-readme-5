import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_PROPERTY } from '../post.constant';
import { PostType, SortDirection, SortProperty } from '@project/shared/types';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @IsIn(Object.values(SortProperty))
  @IsOptional()
  public sortBy: SortProperty = DEFAULT_SORT_PROPERTY;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @IsString()
  @IsOptional()
  public userId: string;

  @IsIn(['text', 'photo'])
  @IsOptional()
  public type: PostType;

  @IsString()
  @IsOptional()
  public search: string;
}