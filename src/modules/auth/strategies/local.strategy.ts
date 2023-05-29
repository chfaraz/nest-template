import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../dto/signin.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(createUserDto: SigninDto): Promise<any> {
    const user = await this.authService.validateUser(createUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}