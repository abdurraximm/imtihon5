import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";

interface IClientCreationAttr {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  activation_link:string
  is_active:boolean
}

@Table({ tableName: "clients", timestamps: false })
export class Client extends Model<Client, IClientCreationAttr> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false
  })
  is_active: boolean;

  @HasMany(() => Order)
  orders: Order[];
}
