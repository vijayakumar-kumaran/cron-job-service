import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = 500;
      let message = 'Internal Server Error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        message = exception.getResponse() as string;
      } else {
        exception = new InternalServerErrorException();
      }
  
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }
  