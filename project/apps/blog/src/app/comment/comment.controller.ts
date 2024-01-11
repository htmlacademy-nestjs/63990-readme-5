import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { fillDto } from '@project/shared/helpers';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {}

  @Post('/')
  public async create(
    @Param('postId') postId: string, 
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentService.create(dto, postId);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
  
  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.commentService.getComments(postId);

    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }
}