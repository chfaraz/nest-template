import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/config/decorators/roles.decorator';
import { Role } from 'src/config/enums/role.enum';
import { Public } from 'src/config/decorators/public.decorator';
import { off } from 'process';
import { User } from './entities/user.entity';
import { CommonPaginationQueryRequestDto } from '../auth/dto/common-pagination-query.request.dto';
import { FindUserResponse } from './responses/find-user.response';
import { FindUserResponseDto } from './dto/find-user.response.dto';
import { DefaultException } from 'src/config/exceptions/default.exception';
import { createUserResponse } from './responses/create-user.response';
import { updateUserResponse } from './responses/update-user.response';
import { Message } from 'src/config/interfaces/message-response.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiBearerAuth('access-token')
  // @ApiOperation({
  //   description: 'This Endpoint will create a new user.',
  // })
  // @ApiOkResponse(createUserResponse)
  // @ApiResponse({ status: 400, type: () => DefaultException })
  // @Roles(Role.SUPERADMIN)
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  // @Public()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    description: 'This Endpoint will get the list of user.',
  })
  @ApiOkResponse(FindUserResponse)
  @ApiExtraModels(FindUserResponseDto)
  @ApiResponse({ status: 400, type: () => DefaultException })
  @Get()
  async findAll(
    @Query()
    userQueryRequestDto: CommonPaginationQueryRequestDto,
  ) {
    return this.usersService.findAll(userQueryRequestDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    description: 'This Endpoint will get the a user by id.',
  })
  @ApiOkResponse(createUserResponse)
  @ApiResponse({ status: 400, type: () => DefaultException })
  @Roles(Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const res = await this.usersService.findOne({ id });
    delete res.dataValues.password;
    return res;
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    description: 'This Endpoint will update the user by id.',
  })
  @ApiOkResponse(updateUserResponse)
  @ApiResponse({ status: 400, type: () => DefaultException })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ): Promise<Message> {
    return this.usersService.update(id, updateUserDto, req.user);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
