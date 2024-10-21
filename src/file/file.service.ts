import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class FileService {
  async readLocalImage(filePath: string): Promise<Buffer> {
    try {
      const data = await readFileAsync(filePath);
      return data;
    } catch (error) {
      throw new Error(`Error reading local image: ${error.message}`);
    }
  }

  async getAllFileNames(directoryPath: string){
    // 使用 fs.readdirSync 同步读取指定目录下的所有文件和文件夹
    const files = fs.readdirSync(directoryPath);

    // 过滤掉目录中的文件夹，只保留文件名
    const fileNames = files.filter(fileName => {
      const filePath = join(directoryPath, fileName);
      return fs.statSync(filePath).isFile();
    });

    return fileNames;
  }
}
