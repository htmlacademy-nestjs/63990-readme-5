import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus, ValidationPipe, UsePipes, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/shared/helpers';
import { PostService } from './post.service';
import { postRdoMap } from './rdo/post-rdo.map';
import { PostValidationPipe } from './pipes/post-validation.pipe';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './query/post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { CreateTextPostDto } from './dto/create-text-post.dto';

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
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(PostWithPaginationRdo, result);
  }

  @Post('/')
  @UsePipes(new PostValidationPipe('create'))
  public async create(@Body() dto: CreateTextPostDto) { // TODO: dto types
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
  @UsePipes(new PostValidationPipe('update'))
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);

    const rdo = postRdoMap[updatedPost.type];
    return fillDto(rdo, updatedPost.toPOJO());
  }
}