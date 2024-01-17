import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import mongoConfig from './mongo.config';
import jwtConfig from './jwt.config';
import rabbitConfig from './rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/users/user.env'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: ENV_USERS_FILE_PATH,
    load: [appConfig, mongoConfig, jwtConfig, rabbitConfig]
  })]
})
export class ConfigUsersModule {}
