import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UUIDVersion } from 'class-validator';
import {
  AfterFind,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/config/enums/role.enum';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @ApiPropertyOptional()
  id: string;
  
  @Column
  @ApiPropertyOptional()
  firstName: string;
  
  @Column
  @ApiPropertyOptional()
  lastName: string;
  
  @Column({unique:true})
  @ApiPropertyOptional()
  email: string;
  
  @Column
  @ApiPropertyOptional()
  userName: string;
  
  @Column
  @ApiPropertyOptional()
  @Exclude({ toPlainOnly: true })
  password: string;
  
  @Column({
    allowNull: false,
    type: DataType.ARRAY(DataType.ENUM(...Object.values(Role))),
  })
  @ApiPropertyOptional()
  roles: Role[];
  
  @Column
  @ApiPropertyOptional()
  picture: string;
}
