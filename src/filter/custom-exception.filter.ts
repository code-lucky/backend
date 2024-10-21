import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.getResponse ? exception.getResponse() : 'Internal server error';

    if (exception instanceof BadRequestException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: '',
        errors: message,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
