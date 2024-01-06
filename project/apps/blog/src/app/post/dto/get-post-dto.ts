import { PostType } from '@project/libs/shared-types';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreatePhotoPostDto } from './create-photo-post.dto';

export const getPostDtoByType = (postType: PostType) => {
  switch(postType) {
    case 'text':
      return CreateTextPostDto;
    case 'photo':
      return CreatePhotoPostDto;
  }
}