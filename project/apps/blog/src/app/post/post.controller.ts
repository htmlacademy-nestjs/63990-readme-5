import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/libs/helpers';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { postRdoMap } from './rdo/get-post-rdo';

@Controller('posts')
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
    const blogPostsEntities = await this.postService.getAllPosts();
    const posts = blogPostsEntities.map((blogPost) => {
      const rdo = postRdoMap[blogPost.type];
      return fillDto(rdo, blogPost.toPOJO())
    });
    return posts;
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    // TODO: types
    const newPost = await this.postService.createPost(dto);

    const rdo = postRdoMap[newPost.type];
    return fillDto(rdo, newPost.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  // @Patch('/:id')
  // public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
  //   const updatedCategory = await this.blogCategoryService.updateCategory(id, dto);
  //   return fillDto(CategoryRdo, updatedCategory.toPOJO());
  // }
}