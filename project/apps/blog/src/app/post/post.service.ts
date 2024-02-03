import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogTagService } from '../tag/tag.service';
import { BlogPostQuery } from './query/post.query';
import { PaginationResult } from '@project/shared/types';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagService: BlogTagService,
  ) {}

  public async getPost(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async getAllPosts(query?: BlogPostQuery, userId?: string): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query, userId);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const tags = await this.tagService.getTagsByIds(dto.tags);
    const newPost = PostEntity.fromDto(dto, tags);

    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentCategoryIds = existsPost.tags.map((category) => category.id);
        isSameTags = currentCategoryIds.length === value.length &&
          currentCategoryIds.some((categoryId) => value.includes(categoryId));

        if (! isSameTags) {
          existsPost.tags = await this.tagService.getTagsByIds(dto.tags);
        }
      }
    }

    if (isSameTags && ! hasChanges) {
      return existsPost;
    }

    return this.postRepository.update(id, existsPost);
  }
}