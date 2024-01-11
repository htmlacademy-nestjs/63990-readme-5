import { PostType } from '@project/shared/types';
import { TextPostEntity } from './text-post.entity';
import { PhotoPostEntity } from './photo-post.entity';


export const getEntityByType = (postType: PostType) => {
  switch(postType) {
    case 'text':
      return TextPostEntity;
    case 'photo':
      return PhotoPostEntity;
  }
}