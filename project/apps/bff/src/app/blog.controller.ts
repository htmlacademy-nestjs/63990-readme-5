import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CreatePostDto } from '../../../blog/src/app/post/dto/create-post.dto';
import { UpdatePostDto } from '../../../blog/src/app/post/dto/update-post.dto';
import { BlogPostQuery } from './query/post.query';
import { HasTokenGuard } from './guards/has-token.guard';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(HasTokenGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('/')
  public async find(
    @Body() dto: {userId: string},
    @Query() query: BlogPostQuery
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}`, {
      data: dto,
      params: query
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto);
    return data;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/:id/like')
  public async likePost(
    @Param('id') id: string,
    @Body() dto: {userId: string}
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}/like`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('/:id/like')
  public async deleteLikePost(
    @Param('id') id: string,
    @Body() dto: {userId: string}
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}/like`, {
      data: dto
    });
    return data;
  }

  // @UseGuards(CheckAuthGuard)
  // @UseInterceptors(UseridInterceptor)
  // @Post('/tags')
  // public async createTag(@Body() dto: CreateTagDto) {

  //   const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tags}/`, dto);
  //   return data;
  // }

  // @UseGuards(CheckAuthGuard)
  // @UseInterceptors(UseridInterceptor)
  // @Get('/tags')
  // public async findTags() {
  //   const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tags}/asd`);
  //   return data;
  // }

}