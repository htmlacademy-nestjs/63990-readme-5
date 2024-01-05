import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/libs/helpers';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';

@Controller('categories')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Get('/')
  public async index() {
    // TODO: types
    const blogPostsEntities = await this.postService.getAllPosts();
    const posts = blogPostsEntities.map((blogPost) => blogPost.toPOJO());
    return fillDto(PostRdo, posts);
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    // TODO: types
    const newCategory = await this.postService.createPost(dto);
    return fillDto(PostRdo, newCategory.toPOJO());
  }

  // @Delete('/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // public async destroy(@Param('id') id: string) {
  //   await this.blogCategoryService.deleteCategory(id);
  // }

  // @Patch('/:id')
  // public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
  //   const updatedCategory = await this.blogCategoryService.updateCategory(id, dto);
  //   return fillDto(CategoryRdo, updatedCategory.toPOJO());
  // }
}