import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/storage';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { Body, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';
import { join } from 'path';
import * as fs from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('test/filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const projectRoot = process.cwd();
      const imagePath = join(projectRoot, 'uploads', filename);
      console.log(imagePath);
      const imageBuffer = await this.fileService.readLocalImage(imagePath);
      res.setHeader('Content-Type', 'image/jpeg'); // 设置响应的Content-Type，根据实际情况调整
      res.send(imageBuffer);
    } catch (error) {
      // 处理错误
      res.status(500).send('Error retrieving image');
    }
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  async fileUpload(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    return {file: file[0].filename}
  }

  @Get('video/:filename')
  async getVideos(@Param('filename') filename: string, @Res() res: Response) {
    const videoPath = join('D:/softs', filename);; // 路径应指向您的视频文件夹
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  }

  @Get('videos/:filename')
  async getVideo(@Param('filename') filename: string, @Res() res: Response) {
    const videoPath = join('D:/softs', filename);
    fs.access(videoPath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).send('File not found');
        return;
      }

      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = res.req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
      }
    });
  }

  @Get('files')
  getFileName() {
    const directoryPath = 'D:/softs'
    return this.fileService.getAllFileNames(directoryPath);
  }
}
