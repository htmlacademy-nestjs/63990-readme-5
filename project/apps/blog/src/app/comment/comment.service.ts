import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postService: PostService
  ) {}

  public async create(dto: CreateCommentDto, postId: string) {
    const existPost = await this.postService.getPost(postId);
    const newTag = CommentEntity.fromDto(dto, existPost.id);
    return this.commentRepository.save(newTag);
  }

  public async getComments(postId: string) {
    return this.commentRepository.findByPostId(postId);
  }
}