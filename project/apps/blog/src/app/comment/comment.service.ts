import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { PostService } from '../post/post.service';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postService: PostService
  ) {}

  public async create(dto: CreateCommentDto, postId: string) {
    const existPost = await this.postService.getPost(postId);

    if (!existPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const newTag = CommentEntity.fromDto(dto, existPost.id);
    return this.commentRepository.save(newTag);
  }

  public async getComments(postId: string, query?: CommentQuery) {
    return this.commentRepository.findByPostId(postId, query);
  }

  public async deleteComment(commentId: string, userId: string) {
    const existPost = await this.commentRepository.findById(commentId);

    if (!existPost) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    if (existPost.userId !== userId) {
      throw new BadRequestException(`You can't delete comment with ID ${commentId}`);
    }
    
    await this.commentRepository.deleteById(commentId);
  }
}