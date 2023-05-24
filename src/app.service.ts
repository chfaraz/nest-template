import { Injectable } from '@nestjs/common';
import { Response } from './config/interceptors/transform.interceptor';

@Injectable()
export class AppService {
  getHello(): Response<null> {
    return {message:'server is running...',statusCode:200, success: true};
  }
}
