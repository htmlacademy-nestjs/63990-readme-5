import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaClientModule } from '@project/shared/blog/models';
import { PostRepository } from './post.repository';
import { BlogTagService } from '../tag/tag.service';
import { BlogTagModule } from '../tag/tag.module';

@Module({
  imports: [PrismaClientModule, BlogTagModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService]
})
export class PostModule {}
