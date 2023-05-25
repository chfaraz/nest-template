import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/config/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'First Name of user',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last Name of user',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'userName',
    required: true,
  })
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'password',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'roles',
    required: true,
  })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({
    description: 'picture url',
    required: false,
  })
  @IsOptional()
  @IsString()
  picture: string;
}
