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
import { RefreshTokenGuard } from 'src/config/guards/refresh.guard';
import { User } from '../users/entities/user.entity';
import { createUserResponse } from '../users/responses/create-user.response';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SigninInterface } from './interfaces/signin.interface';
import { Tokens } from './interfaces/token.interface';
import { JwtRefreshStrategy } from './strategies/refresh-jwt.strategy';
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
  async signUp(@Body() signUpDto: CreateUserDto,  @Request() req: any):Promise<User> {
    const res = await this.authService.signUp(signUpDto, req.user);
    const { password, ...userData } = res.dataValues;
    return new User(userData)

  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    description: 'This Endpoint will give you new pair of token if your refresh token is valid.',
  })
  @ApiOkResponse(SigninResponse)
  @ApiResponse({ status: 400, type: () => DefaultException })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshToken( @Request() req: any):Promise<Tokens> {
    return this.authService.getTokens(req.user);
  }
}
