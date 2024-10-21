import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SystemLog } from '../../entitys/system-log.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SystemLogService {
  
  @InjectRepository(SystemLog)
  private systemLogRepository: Repository<SystemLog>;

  async getList(page: number, pageSize: number) {
    try {
      const list = await this.systemLogRepository.find({
        order: {
          create_time: 'DESC'
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      });
      return {
        list,
        total: await this.systemLogRepository.count()
      }
    }catch(e) {
      throw new HttpException('获取系统日志列表失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
