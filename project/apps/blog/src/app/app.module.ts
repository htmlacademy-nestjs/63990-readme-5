import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { BlogTagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PostModule, BlogTagModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
