import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@prisma/client';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateIf } from 'class-validator';

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

  
  // Text type
  @ApiProperty({
    description: 'Post title',
    example: 'Node JS'
  })
  @ValidateIf(o => o.type === 'text')
  @MinLength(20)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  public title: string

  @ApiProperty({
    description: 'Post text',
    example: 'Node JS text'
  })
  @ValidateIf(o => o.type === 'text')
  @MinLength(100)
  @MaxLength(1024)
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'Post preview',
    example: 'Node JS preview'
  })
  @ValidateIf(o => o.type === 'text')
  @MinLength(50)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  public preview: string;


  // Photo type
  @ApiProperty({
    description: 'Post photo',
    example: 'Node JS'
  })
  @ValidateIf(o => o.type === 'photo')
  @IsString()
  @IsNotEmpty()
  public photo: string
}