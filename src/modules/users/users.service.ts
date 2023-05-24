import {
  Injectable,
  HttpException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto } from '../../config/dtos/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: Repository<User>,
    ){}
  // Logger.log('info');
  // Logger.warn('warning');
  // Logger.error('something went wrong! ', 'error');
  // throw new ForbiddenException();
  async create(createUserDto: CreateUserDto):Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(args:any) {
    return await this.userRepository.findOne({where:{...args}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
