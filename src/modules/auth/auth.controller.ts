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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/roles.decorator';
import { CreateUserDto } from 'src/config/dtos/create-user.dto';
import { Role } from 'src/config/enums/role.enum';
import { DefaultException } from 'src/config/exceptions/default.exception';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { createUserResponse } from '../users/responses/create-user.response';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SigninInterface } from './interfaces/signin.interface';
import { SigninResponse } from './responses/signin.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({
    description: 'signin to the application and get access token.',
  })
  @ApiOkResponse(SigninResponse)
  @ApiResponse({ status: 400, type: () => DefaultException })
  @Post('login')
  async signIn(@Body() signInDto: SigninDto):Promise<SigninInterface> {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    description: 'This Endpoint will create a new user.',
  })
  @ApiOkResponse(createUserResponse)
  @ApiResponse({ status: 400, type: () => DefaultException })
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto,  @Request() req: any):Promise<User> {
    console.log(11111);
    
    return this.authService.signUp(signUpDto, req.user);
  }
}
