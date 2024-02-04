import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus, ValidationPipe, UsePipes, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/shared/helpers';
import { PostService } from './post.service';
import { postRdoMap } from './rdo/post-rdo.map';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './query/post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    const rdo = postRdoMap[post.type];
    return fillDto(rdo, post.toPOJO());
  }

  @Get('/')
  public async index(
    @Query() query: BlogPostQuery,
    @Body() dto: {userId: string},
  ) {
    const postsWithPagination = await this.postService.getAllPosts(query, dto.userId);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(PostWithPaginationRdo, result);
  }
  
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);

    const rdo = postRdoMap[newPost.type];
    return fillDto(rdo, newPost.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);

    const rdo = postRdoMap[updatedPost.type];
    return fillDto(rdo, updatedPost.toPOJO());
  }

  @Post('/:id/repost')
  public async repost(
    @Body() { userId }: {userId: string},
    @Param('id') id: string
  ) {
    console.log(userId)
    const repost = await this.postService.repost(id, userId);

    const rdo = postRdoMap[repost.type];
    return fillDto(rdo, repost.toPOJO());
  }
}