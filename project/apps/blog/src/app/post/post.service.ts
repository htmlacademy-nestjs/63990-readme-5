import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PostRepository } from './post.repository';
import { PostEntityType } from './post.type';
import { CreatePostDto } from './dto/create-post.dto';
import { getEntityByType } from './entities/entities-types.map';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  public async getPost(id: string): Promise<PostEntityType> {
    return this.postRepository.findById(id);
  }

  public async getAllPosts(): Promise<PostEntityType[]> {
    return await this.postRepository.find();
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntityType> {
    // const existsPost = (await this.postRepository.find({ title: dto.title })).at(0);

    // if (existsPost) {
    //   throw new ConflictException('A post with the title already exists');
    // }

    const postType = getEntityByType(dto.type);

    const newPost = new postType(dto);

    await this.postRepository.save(newPost);

    return newPost;
  }

  // public async deleteCategory(id: string): Promise<void> {
  //   try {
  //     await this.blogCategoryRepository.deleteById(id);
  //   } catch {
  //     // TODO. Обратите внимание. Ошибки могут быть разными
  //     // Вы должны реагировать на них по-разному.
  //     throw new NotFoundException(`Category with ID ${id} not found`);
  //   }
  // }

  // public async updateCategory(id: string, dto: UpdateCategoryDto): Promise<BlogCategoryEntity> {
  //   const blogCategoryEntity = new BlogCategoryEntity(dto);

  //   try {
  //     const updatedCategory = await this.blogCategoryRepository.update(id, blogCategoryEntity);
  //     return updatedCategory;
  //   } catch {
  //     throw new NotFoundException(`Category with ID ${id} not found`);
  //   }
  // }
}