import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';
import { BlogTagRepository } from './tag.repository';
import { BlogTagService } from './tag.service';
import { BlogTagController } from './tag.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogTagRepository, BlogTagService],
  controllers: [BlogTagController],
  exports: [BlogTagService]
})
export class BlogTagModule {}