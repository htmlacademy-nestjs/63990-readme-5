import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [LikeRepository, LikeService],
  controllers: [LikeController],
  exports: [LikeService]
})
export class LikeModule {}