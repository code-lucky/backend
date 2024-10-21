import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { format } from 'date-fns';

@Injectable()
export class FormatDatetimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => this.formatDateTimeFields(data))
    );
  }

  private formatDateTimeFields(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.formatDateTimeFields(item));
    } else if (data !== null && typeof data === 'object') {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = (key === 'create_time' || key === 'update_time') && this.isDate(data[key])
          ? format(new Date(data[key]), 'yyyy-MM-dd HH:mm:ss')
          : this.formatDateTimeFields(data[key]);
        return acc;
      }, {});
    }
    return data;
  }

  private isDate(value: any): boolean {
    return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
  }
}
