import { UUIDVersion } from 'class-validator';
import {
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
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({unique:true})
  email: string;

  @Column
  userName: string;

  @Column
  password: string;

  @Column({
    allowNull: false,
    type: DataType.ARRAY(DataType.ENUM(...Object.values(Role))),
})
  roles: Role[];

  @Column
  picture: string;
}
