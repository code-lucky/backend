import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

/**
 * 响应拦截器
 */
@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
    response.header("Pragma", "no-cache");
    response.header("Expires", '0');

    return next.handle().pipe(map((data) => {
      return {
        code: response.statusCode == 200 || response.statusCode == 201 ? 200 : response.statusCode,
        message: 'success',
        data
      }
    }));
  }
}

