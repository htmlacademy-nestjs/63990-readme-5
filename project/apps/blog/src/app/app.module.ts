import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { BlogTagModule } from './tag/tag.module';

@Module({
  imports: [PostModule, BlogTagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
