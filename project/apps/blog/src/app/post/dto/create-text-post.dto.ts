import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Node JS'
  })
  public title: string[]

  @ApiProperty({
    description: 'Post text',
    example: 'Node JS text'
  })
  public text: string;

  @ApiProperty({
    description: 'Post preview',
    example: 'Node JS preview'
  })
  public userId: string;
}