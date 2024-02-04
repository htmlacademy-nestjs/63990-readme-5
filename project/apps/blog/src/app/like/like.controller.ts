import { Controller, Param, Post, Body, Delete, HttpCode, HttpStatus, } from '@nestjs/common';
import { LikeService } from './like.service';


@Controller('posts')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @Post('/:postId/like')
  public async like(@Body() { userId }, @Param('postId') postId: string) {
    return this.likeService.likePost(postId, userId);
  }

  @Delete('/:postId/like')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Body() { userId }, @Param('postId') postId: string) {
    await this.likeService.deleteLike(postId, userId);
  }
}