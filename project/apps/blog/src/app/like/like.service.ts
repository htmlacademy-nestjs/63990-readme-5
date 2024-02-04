import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository
  ) {}

  public async likePost(postId: string, userId): Promise<LikeEntity> {
    const existsLike = await this.likeRepository.find(postId, userId);

    if (existsLike) {
      throw new ConflictException('You have already already liked this post');
    }

    const newLike = new LikeEntity({
      postId,
      userId
    });
    
    await this.likeRepository.save(newLike);

    return newLike;
  }

  public async deleteLike(postId: string, userId): Promise<void> {
    const existsLike = await this.likeRepository.find(postId, userId);

    if (!existsLike) {
      throw new NotFoundException(`You didn't like this post`);
    }

    try {
      await this.likeRepository.delete(postId, userId);
    } catch {
      throw new BadRequestException(`Something went wrong`);
    }
  }
}