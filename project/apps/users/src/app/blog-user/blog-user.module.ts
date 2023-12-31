import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  providers: [BlogUserRepository],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}