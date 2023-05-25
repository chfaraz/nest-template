import {
  Injectable,
  HttpException,
  ForbiddenException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto } from '../../config/dtos/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonPaginationQueryRequestDto } from '../auth/dto/common-pagination-query.request.dto';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';
import { Message } from 'src/config/interfaces/message-response.interface';
import { Role } from 'src/config/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // Logger.log('info');
  // Logger.warn('warning');
  // Logger.error('something went wrong! ', 'error');
  // throw new ForbiddenException();
  //dont use this method from any where other then in signup
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(
    filters: CommonPaginationQueryRequestDto,
  ): Promise<{ count: number; rows: User[] }> {
    const res = await this.userRepository.findAndCountAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${filters.search ?? ''}%` } },
          { lastName: { [Op.iLike]: `%${filters.search ?? ''}%` } },
        ],
      },
      limit: filters.limit ?? 10,
      offset: filters.offset ?? 0,
    });
    res.rows.forEach((item) => delete item.dataValues.password);
    return res;
  }

  async findOne(args: any): Promise<User> {
    const res = (
      await this.userRepository.findOne<User>({ where: { ...args } })
    );
    return res;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    user: any,
  ): Promise<Message> {
    delete updateUserDto.password;
    const found = await this.findOne({ id });
    if (!found) throw new NotFoundException();
    if (!this.canUpdate(user, found.roles, id))
      throw new UnauthorizedException('you are not allowed to do this action');
    const res = await this.userRepository.update(updateUserDto, {
      where: { id },
    });
    return res[0]
      ? { message: 'updated successfully' }
      : { message: 'failed to update' };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  canUpdate(user: any, roles, id): boolean {
    if (user.roles.includes(Role.ADMIN)) {
      if (roles.includes(Role.SUPERADMIN)) {
        return false;
      } else if (roles.includes(Role.ADMIN)) {
        if (user.id !== id) return false;
      }
    } else if (user.roles.includes(Role.MANAGER)) {
      if (roles.includes(Role.SUPERADMIN)) {
        return false;
      } else if (roles.includes(Role.ADMIN)) {
        return false;
      } else if (roles.includes(Role.MANAGER)) {
        if (user.id !== id) return false;
      }
    }
    return true;
  }
}
