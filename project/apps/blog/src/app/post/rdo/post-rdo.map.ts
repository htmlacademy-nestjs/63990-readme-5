import { PostType } from '@project/shared/types';
import { TextPostRdo } from './text-post.rdo';
import { PhotoPostRdo } from './photo-post.rdo';
import { PostRdo } from './post.rdo';

export const postRdoMap: Record<PostType, typeof PostRdo> = {
  'text': TextPostRdo,
  'photo': PhotoPostRdo,
  'link': PhotoPostRdo,
  'quote': PhotoPostRdo,
  'video': PhotoPostRdo
}