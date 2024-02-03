import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';

@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Get('/post/:postId')
  public async showPostComments(
    @Param('postId') postId: string,
    @Query() query: CommentQuery
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/post/${postId}`, {params: query});
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/post/:postId')
  public async addComment(@Body() dto: CreateCommentDto, @Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/post/${postId}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:commentId')
  public async deleteComment(
    @Body() { userId },
    @Param('commentId') commentId: string,
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${commentId}`, {data: {userId}});
    return data;
  }
}