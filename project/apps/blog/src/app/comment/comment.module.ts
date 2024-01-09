import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/shared/blog/models';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PrismaClientModule, PostModule],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController]
})
export class CommentModule {}