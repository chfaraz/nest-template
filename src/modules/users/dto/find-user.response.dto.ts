import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import { Role } from 'src/config/enums/role.enum';

export class FindUserResponseDto {
  @ApiPropertyOptional()
  id: string;
  
  @ApiPropertyOptional()
  firstName: string;
  
  @ApiPropertyOptional()
  lastName: string;
  
  @ApiPropertyOptional()
  email: string;
  
  @ApiPropertyOptional()
  userName: string;
  
  @ApiPropertyOptional()
  roles: Role[];
  
  @ApiPropertyOptional()
  picture: string;

  @ApiPropertyOptional()
  createdAt: string;

  @ApiPropertyOptional()
  updatedAt: string;
}
