import { Injectable, ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/config/dtos/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<any> {
    const exist = await this.usersService.findOne({ email: signUpDto.email });
    if (exist) throw new ConflictException('email already exist');
    const user = await this.usersService.create(signUpDto);
    const { password, ...userData } = user.dataValues;
    return {
      data: userData,
      statusCode: 201,
      message: 'user created successfully',
    };
  }

  async signIn(signInDto: SigninDto): Promise<any> {
    const { userName, password } = signInDto;

    const found = await this.usersService.findOne({ userName });

    if (!found) throw new NotFoundException('invalid credentials');

    // const isMatch = await bcrypt.compare(password, found.password);

    // if (!isMatch) {
    //   throw new NotFoundException('invalid credentials');
    // }
    const token = await this.getToken(found);

    return { success: true, data: { userName, token } };
  }

  async validateUser(signInDto: SigninDto): Promise<any> {
    const user = await this.signIn(signInDto);
    if (user) {
      return user;
    }
    return null;
  }

  async getToken(user: User): Promise<any> {
    // const user = await this.usersService.findOne({userName});
    //   if (user?.password !== pass) {
    //     throw new UnauthorizedException();
    //   }
    //   const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      userName: user.userName,
    };
    return await this.jwtService.signAsync(payload);
  }
}
