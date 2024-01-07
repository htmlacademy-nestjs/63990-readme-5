import { IsOptional, IsString } from 'class-validator';
import { UpdatePostDto } from './update-post.dto';

export class UpdatePhotoPostDto extends UpdatePostDto {
  @IsString()
  @IsOptional()
  public photo?: string;
}