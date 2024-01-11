import { Post } from './post.interface';

export interface TextPost extends Post {
  title: string;
  preview: string;
  text: string;
}