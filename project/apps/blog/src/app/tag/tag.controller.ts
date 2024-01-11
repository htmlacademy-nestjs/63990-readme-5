import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { BlogTagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { fillDto } from '@project/shared/helpers';
import { TagRdo } from './rdo/tag.rdo';
import { UpdateTagDto } from './dto/update-tag.dto';
@Controller('categories')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    return this.blogTagService.getTag(id);
  }

  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const newCategory = await this.blogTagService.createTag(dto);
    return fillDto(TagRdo, newCategory.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogTagService.deleteTag(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const updatedCategory = await this.blogTagService.updateTag(id, dto);
    return fillDto(TagRdo, updatedCategory.toPOJO());
  }
}