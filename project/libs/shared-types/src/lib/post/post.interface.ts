import { PostStatus } from './post-status.enum';

export interface Post {
  id?: string;
  tags: string[]
  status: PostStatus;
}