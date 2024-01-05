import { PhotoPost, TextPost } from '@project/libs/shared-types';
import { PhotoPostEntity } from './entities/photo-post.entity';
import { TextPostEntity } from './entities/text-post.entity';

export type PostEntityType = TextPostEntity | PhotoPostEntity
export type PostType = TextPost | PhotoPost