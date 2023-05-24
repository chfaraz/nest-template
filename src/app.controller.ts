import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from './config/interceptors/transform.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Response<null> {
    return this.appService.getHello();
  }
}
