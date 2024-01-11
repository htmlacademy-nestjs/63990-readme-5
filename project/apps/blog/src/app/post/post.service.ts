import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PostRepository } from './post.repository';
import { PostEntityType } from './post.type';
import { CreatePostDto } from './dto/create-post.dto';
import { getEntityByType } from './entities/entities-types.map';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogTagService } from '../tag/tag.service';
import { BlogPostQuery } from './query/post.query';
import { PaginationResult } from '@project/shared/types';
import { createEntity } from './entities/create-entity';
import { TextPostEntity } from './entities/text-post.entity';
import { PhotoPostEntity } from './entities/photo-post.entity';
import { CreateTextPostDto } from './dto/create-text-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagService: BlogTagService,
  ) {}

  public async getPost(id: string): Promise<PostEntityType> {
    return this.postRepository.findById(id);
  }

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<PostEntityType>> {
    return this.postRepository.find(query);
  }

  // TODO: tdo types
  public async createPost(dto: CreateTextPostDto): Promise<PostEntityType> {
    const tags = await this.tagService.getTagsByIds(dto.tags);
    const newPost = TextPostEntity.fromDto(dto, tags);

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

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntityType> {
    const existsPost = await this.postRepository.findById(id);
    let isSameCategories = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'categories' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'categories' && value) {
        const currentCategoryIds = existsPost.tags.map((category) => category.id);
        isSameCategories = currentCategoryIds.length === value.length &&
          currentCategoryIds.some((categoryId) => value.includes(categoryId));

        if (! isSameCategories) {
          existsPost.tags = await this.tagService.getTagsByIds(dto.tags);
        }
      }
    }

    if (isSameCategories && ! hasChanges) {
      return existsPost;
    }

    return this.postRepository.update(id, existsPost);
  }
}