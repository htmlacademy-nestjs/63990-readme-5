import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaClientModule } from '@project/blog/models';
import { PostRepository } from './post.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
