import { Like } from './like.interface';
import { PostStatus } from './post-status.type';
import { PostType } from './post-type.type';
import { Tag } from './tag.interface';

export interface Post {
  id?: string;
  tags: Tag[]
  status?: PostStatus;
  userId: string;
  type: PostType;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  text?: string;
  preview?: string;
  photo?: string;
  like?: boolean;
  likesCount?: number;
  commentsCount?: number;

  originalUserId?: string;
  originalId?: string;
  isRepost?: boolean;
}