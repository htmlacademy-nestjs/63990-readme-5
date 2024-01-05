import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post photo',
    example: 'Node JS'
  })
  public photo: string[]
}