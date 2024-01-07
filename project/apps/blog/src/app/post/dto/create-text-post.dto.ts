import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Node JS'
  })
  @IsString()
  @IsNotEmpty()
  public title: string

  @ApiProperty({
    description: 'Post text',
    example: 'Node JS text'
  })
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'Post preview',
    example: 'Node JS preview'
  })
  @IsString()
  @IsNotEmpty()
  public preview: string;
}