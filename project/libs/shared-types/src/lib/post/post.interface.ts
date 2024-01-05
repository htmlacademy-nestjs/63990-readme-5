import { PostStatus } from './post-status.type';
import { PostType } from './post-type.type';

export interface Post {
  id?: string;
  tags: string[]
  status: PostStatus;
  userId: string;
  type: PostType;
}