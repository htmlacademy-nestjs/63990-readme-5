import { Body, Controller, Get, Post, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CreatePostDto } from '../../../blog/src/app/post/dto/create-post.dto';
import { CreateTagDto} from '../../../blog/src/app/tag/dto/create-tag.dto';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
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