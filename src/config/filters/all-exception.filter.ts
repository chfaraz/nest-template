import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  import * as fs from 'fs';

  export interface HttpExceptionResponse {
    statusCode: number;
    error: string;
    success: boolean;
    message: string;
  }
  
  export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    path: string;
    method: string;
    timeStamp: Date;
  }
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private statusCode: number;
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status: HttpStatus;
      let errorMessage: string;
      let message: string;
      
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const errorResponse = exception.getResponse();
        this.statusCode = (errorResponse as HttpExceptionResponse)?.statusCode;
        errorMessage =
          (errorResponse as HttpExceptionResponse).error || exception.message;
  
        message =
          (errorResponse as HttpExceptionResponse).message || exception.message;
      } else {
        Logger.error(exception);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = 'Critical internal server error occurred!';
      }
  
      const errorResponse = this.getErrorResponse(
        status,
        errorMessage,
        request,
        message,
      );
      const errorLog = this.getErrorLog(errorResponse, request, exception);
       this.writeErrorLogToFile(errorLog);
      response.status(status).json(errorResponse);
    }
  
    private getErrorResponse = (
      status: HttpStatus,
      errorMessage: string,
      request: Request,
      message: string,
    ): CustomHttpExceptionResponse => ({
      statusCode: status,
      message: message,
      success: false,
      error: errorMessage,
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
    });
  
    private getErrorLog = (
      errorResponse: CustomHttpExceptionResponse,
      request: Request,
      exception: unknown,
    ): string => {
      const { statusCode, error } = errorResponse;
      const { method, url } = request;
      const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
      ${JSON.stringify(errorResponse)}\n\n
      ${exception instanceof HttpException ? exception.stack : error}\n\n`;
      return errorLog;
    };
  
    private writeErrorLogToFile = (errorLog: string): void => {
      fs.appendFile('error.log', errorLog, 'utf8', (err) => {
        if (err) throw err;
      });
    };
  }