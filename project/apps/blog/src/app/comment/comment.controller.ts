import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { fillDto } from '@project/shared/helpers';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './query/comment.query';

@Controller('comments')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {}

  @Post('/post/:postId')
  public async create(
    @Param('postId') postId: string, 
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentService.create(dto, postId);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
  
  @Get('/post/:postId')
  public async show(
    @Param('postId') postId: string,
    @Query() query: CommentQuery
  ) {
    const comments = await this.commentService.getComments(postId, query);

    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Delete('/:commentId')
  public async delete(
    @Param('commentId') commentId: string,
    @Body() {userId}
  ) {
    return this.commentService.deleteComment(commentId, userId);
  }
}