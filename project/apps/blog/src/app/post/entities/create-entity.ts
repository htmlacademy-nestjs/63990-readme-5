import { TextPostEntity } from './text-post.entity';
import { PostType } from '../post.type';
import { PhotoPost, TextPost } from '@project/libs/shared-types';
import { PhotoPostEntity } from './photo-post.entity';

export const createEntity = (document: PostType) => {
  switch(document.type) {
    case 'text': 
      return TextPostEntity.fromObject(document as TextPost);
    case 'photo': 
      return PhotoPostEntity.fromObject(document as PhotoPost);
  }
}