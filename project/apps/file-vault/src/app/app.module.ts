import { Module } from '@nestjs/common';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FileVaultConfigModule, getMongooseOptions } from '@project/shared/config/file-vault';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileUploaderModule, 
    FileVaultConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
