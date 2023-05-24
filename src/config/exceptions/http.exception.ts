import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();

  
      if (status === 500 || status === 400) {
        Logger.error(status);
        Logger.error(exception?.message);
      }
  
      response.status(status).json({
        statusCode: status,
        timeStamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }