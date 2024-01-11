import { PostType } from '@project/shared/types';
import { CreatePostDto } from './create-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreatePhotoPostDto } from './create-photo-post.dto';
import { UpdatePostDto } from './update-post.dto';
import { UpdateTextPostDto } from './update-text-post.dto';
import { UpdatePhotoPostDto } from './update-photo-post.dto';

export const createPostDtoMap: Record<PostType, typeof CreatePostDto> = {
  'text': CreateTextPostDto,
  'photo': CreatePhotoPostDto,
  'link': CreatePhotoPostDto,
  'quote': CreatePhotoPostDto,
  'video': CreatePhotoPostDto
}

export const updatePostDtoMap: Record<PostType, typeof UpdatePostDto> = {
  'text': UpdateTextPostDto,
  'photo': UpdatePhotoPostDto,
  'link': UpdatePhotoPostDto,
  'quote': UpdatePhotoPostDto,
  'video': UpdatePhotoPostDto
}