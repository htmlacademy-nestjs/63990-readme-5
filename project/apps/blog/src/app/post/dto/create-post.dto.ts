import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@prisma/client';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post tags',
    example: 'flowers'
  })
  public tags: string[]

  @ApiProperty({
    description: 'Post status',
    example: 'published'
  })
  public status: PostStatus;

  @ApiProperty({
    description: 'Author id name',
    example: 'flowers'
  })
  public userId: string;

  @ApiProperty({
    description: 'Post type',
    example: 'text'
  })
  public type: PostType;
}