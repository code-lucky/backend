import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as requestIp from 'request-ip';
import { SystemLog } from 'src/entitys/system-log.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(SystemLog)
    private readonly systemLogRepository: Repository<SystemLog>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const ip = requestIp.getClientIp(request); // 使用 request-ip 获取 IP 地址

    return next.handle().pipe(
      tap(async (data) => {
        // 创建日志记录
        const log = new SystemLog();
        log.api_address = url;
        log.request_method = method;
        log.request_param = JSON.stringify(request.body);
        log.request_ip = ip; // 使用获取的 IP 地址
        log.response_param = JSON.stringify(data);
        log.create_time = new Date();

        // 排除 systemLog 接口，避免无限循环
        if(url.indexOf('systemLog') === -1) {
          // 保存日志记录到数据库
          // await this.systemLogRepository.save(log);
        }
      }),
    );
  }
}
