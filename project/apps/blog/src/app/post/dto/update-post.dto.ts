import { PostStatus, PostType } from '@prisma/client';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @IsEnum(PostStatus)
  @IsOptional()
  public status?: PostStatus;

  @IsEnum(PostType)
  @IsOptional()
  public type?: PostType;

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  public tags?: string[];
}