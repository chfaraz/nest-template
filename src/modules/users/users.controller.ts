import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../config/dtos/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserResponse } from './responses/create-user.response';
import { DefaultException } from 'src/config/exceptions/default.exception';
import { Roles } from 'src/config/decorators/roles.decorator';
import { Role } from 'src/config/enums/role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    description: 'This Endpoint will create a new user.',
  })
  @ApiOkResponse(createUserResponse)
  @ApiResponse({ status: 403, type: () => DefaultException })
  @ApiResponse({ status: 400, type: () => DefaultException })
  @ApiResponse({ status: 401, type: () => DefaultException })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.USER)
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
