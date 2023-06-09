import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './config/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Public()
  @Get()
  getHello(): {message: string} {
    return this.appService.getHello();
  }
}
