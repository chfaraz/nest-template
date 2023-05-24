import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/config.module';
import { DbConfig } from './config/database/database.config';
import { HttpExceptionFilter } from './config/exceptions/http.exception';
import { AllExceptionsFilter } from './config/filters/all-exception.filter';
import { TransformInterceptor } from './config/interceptors/transform.interceptor';
import { AppLoggerMiddleware } from './config/middlewares/request-log.middleware';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot(DbConfig),
    ConfigurationModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

