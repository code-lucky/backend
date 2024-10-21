import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports:[
    TypeOrmModule.forFeature()
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
