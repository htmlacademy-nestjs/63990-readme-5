import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@prisma/client';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post tags',
    example: 'flowers'
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags: string[]

  @ApiProperty({
    description: 'Post status',
    example: 'published'
  })
  @IsEnum(PostStatus)
  @IsOptional()
  public status?: PostStatus;

  @ApiProperty({
    description: 'Author id name',
    example: '658170cbb954e9f5b905ccf4'
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Post type',
    example: 'text'
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  public type: PostType;
}