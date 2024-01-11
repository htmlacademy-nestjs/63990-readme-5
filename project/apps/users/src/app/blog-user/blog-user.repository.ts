import { BaseMongoRepository } from '@project/shared/core';
import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';
import { BlogUserModel } from './blog-user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {
  constructor(
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(blogUserModel, BlogUserEntity.fromObject)
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const user = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(user)
  }
}