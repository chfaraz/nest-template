import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode?: number;
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    console.log(response);//check status code
    
    return next.handle().pipe(
      map((data) => ({
        statusCode: data?.statusCode,
        success: data.data ? true : false,
        message: data.message,
        error: data.error,
        data: data.data,
      })),
    );
  }
}
