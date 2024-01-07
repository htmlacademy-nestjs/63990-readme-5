import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post photo',
    example: 'Node JS'
  })
  @IsString()
  @IsNotEmpty()
  public photo: string
}