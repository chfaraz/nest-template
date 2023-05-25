import { Injectable, ConflictException } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/config/dtos/create-user.dto';
import { Role } from 'src/config/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';
import { SigninInterface } from './interfaces/signin.interface';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto, user): Promise<User> {
    const { roles } = signUpDto;
    if (
      user.roles.includes(Role.ADMIN) &&
      (roles.includes(Role.SUPERADMIN) || roles.includes(Role.ADMIN))
    )
      throw new UnauthorizedException('you are not allowed to do this action');
    if (
      user.roles.includes(Role.MANAGER) &&
      (roles.includes(Role.SUPERADMIN) ||
        roles.includes(Role.ADMIN) ||
        roles.includes(Role.MANAGER))
    )
      throw new UnauthorizedException('you are not allowed to do this action');
    const exist = await this.usersService.findOne({
      [Op.or]: [{ email: signUpDto.email }, { userName: signUpDto.userName }],
      email: signUpDto.email,
    });
    if (exist) throw new ConflictException('email or username already exist');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(signUpDto.password, salt);

    const res = await this.usersService.create({
      ...signUpDto,
      password: hash,
    });
    const { password, ...userData } = res.dataValues;
    return new User(userData);
  }

  async signIn(signInDto: SigninDto): Promise<SigninInterface> {
    const { userName, password } = signInDto;
    const found = await this.usersService.findOne({ userName });
    console.log(found);

    if (!found) throw new NotFoundException('invalid credentials');

    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) {
      throw new NotFoundException('invalid credentials');
    }
    const token = await this.getToken(found);

    return { userName, token };
  }

  async validateUser(signInDto: SigninDto): Promise<SigninInterface | null> {
    const user = await this.signIn(signInDto);
    if (user) {
      return user;
    }
    return null;
  }

  async getToken(user: User): Promise<string> {
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
