import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/roles.decorator';
import { CreateUserDto } from 'src/config/dtos/create-user.dto';
import { Role } from 'src/config/enums/role.enum';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }
  
  // @Roles(Role.User)
  // @ApiBearerAuth('access-token')
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return { data: 'data', statusCode: 200, success: true };
  // }
}
