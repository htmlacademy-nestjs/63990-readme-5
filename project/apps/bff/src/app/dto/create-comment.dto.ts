import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @MinLength(10)
  @MaxLength(300)
  @IsString()
  @IsNotEmpty()
  public message: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}