import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../config/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/config/enums/role.enum';
const dotenv = require('dotenv');
dotenv.config();

describe('AuthService', () => {
  let service: AuthService;
  let mockUserServce: Partial<UsersService>;
  beforeEach(async () => {
    //create fake copy of the user service
    mockUserServce = {
      findOne: () => Promise.resolve(null),
      create: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: '1',
          email: createUserDto.email,
          password: createUserDto.password,
        } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: mockUserServce,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('create a new user with a hashed password', async () => {
    const user = await service.signUp(
      {
        firstName: 'string',
        lastName: 'string',
        email: 'string@d.trr',
        userName: 'string123',
        password: 'string',
        roles: [Role.USER],
        picture: 'string',
      },
      { roles: [] },
    );
    expect(user).toBeDefined();
  });

  it('dont create a user if email or username exist', async () => {
    mockUserServce.findOne = () =>
      Promise.resolve({
        id: '1',
        email: 'string@d.trr',
        password: '1',
      } as User);

    await expect(
      service.signUp(
        {
          firstName: 'string',
          lastName: 'string',
          email: 'string@d.trr',
          userName: 'string123',
          password: 'string',
          roles: [Role.USER],
          picture: 'string',
        },
        { roles: [] },
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('signin user and get tokens', async () => {
    mockUserServce.findOne = () =>
      Promise.resolve({
        id: '1',
        email: 'string@d.trr',
        password:
          '$2b$10$h4mRE0gu4aZoSm8XwcSRfODoaLFFD3GU7NpD80T2ajDRabPEu2uj2',
      } as User);
    const user = await service.signIn({
      userName: 'string123',
      password: 'string',
    });
    expect(user).toBeDefined();
  });

  it('dont signin if password not maatch', async () => {
    mockUserServce.findOne = () =>
      Promise.resolve({
        id: '1',
        email: 'string@d.trr',
        password:
          '$2b$10$h4mRE0gu4aZoSm8XwcSRfODoaLFFD3GU7NpD80c2ajDRabPEu2uj2',
      } as User);

    await expect(
      service.signIn({
        userName: 'string123',
        password: 'string',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('dont signin if user not found', async () => {
    await expect(
      service.signIn({
        userName: 'string123',
        password: 'string',
      }),
    ).rejects.toThrow(NotFoundException);
  });

});
