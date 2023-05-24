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
    description: 'Last Name of user',
    required: true,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Last Name of user',
    required: true,
  })
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Last Name of user',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Last Name of user',
    required: true,
  })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({
    description: 'Last Name of user',
    required: true,
  })
  @IsOptional()
  @IsString()
  picture: string;
}
