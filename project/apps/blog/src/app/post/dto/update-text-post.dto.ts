import { IsOptional, IsString } from 'class-validator';
import { UpdatePostDto } from './update-post.dto';

export class UpdateTextPostDto extends UpdatePostDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public text?: string;

  @IsString()
  @IsOptional()
  public preview?: string;
}