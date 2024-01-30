import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { BlogTagRepository } from './tag.repository';
import { BlogTagEntity } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly tagRepository: BlogTagRepository
  ) {}

  public async getTag(id: string): Promise<BlogTagEntity> {
    return this.tagRepository.findById(id);
  }

  public async createTag(dto: CreateTagDto): Promise<BlogTagEntity> {
    const existsTag = await this.tagRepository.findByTitle(dto.title);

    if (existsTag) {
      throw new ConflictException('A Tag with the title already exists');
    }

    const newTag = new BlogTagEntity(dto);
    await this.tagRepository.save(newTag);

    return newTag;
  }

  public async deleteTag(id: string): Promise<void> {
    try {
      await this.tagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<BlogTagEntity> {
    const blogTagEntity = new BlogTagEntity(dto);

    try {
      const updatedTag = await this.tagRepository.update(id, blogTagEntity);
      return updatedTag;
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async getTagsByIds(categoryIds: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.tagRepository.findByIds(categoryIds);

    if (tags.length !== categoryIds.length) {
      const foundTagsIds = tags.map((category) => category.id);
      const notFoundTagsIds = categoryIds.filter((categoryId) => !foundTagsIds.includes(categoryId));

      if (notFoundTagsIds.length > 0) {
        throw new NotFoundException(`Tags with ids ${notFoundTagsIds.join(', ')} not found.`);
      }
    }

    return tags;
  }
}