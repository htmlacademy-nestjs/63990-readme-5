import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreatePostDto } from '../dto/create-post.dto';
import { createPostDtoMap, updatePostDtoMap } from '../dto/post-dto.map';

type PostOperationtype = 'create' | 'update'

@Injectable()
export class PostValidationPipe implements PipeTransform<CreatePostDto> {
  operationType: PostOperationtype

  constructor(operationType: PostOperationtype) {}

  async transform(value: CreatePostDto) {
    const typeDto = this.operationType === 'create' 
      ? createPostDtoMap[value.type] 
      : updatePostDtoMap[value.type];
    const object = plainToInstance(typeDto, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(errors.map((error) => error.constraints).flat());
    }
    
    return value;
  }
}