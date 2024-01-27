import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/shared/config/users'
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthModule,
    BlogUserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    NotifyModule,
  ],
})
export class AppModule {}
