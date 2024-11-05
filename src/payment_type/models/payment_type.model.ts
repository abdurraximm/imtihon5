import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Payment } from "../../payment/models/payment.model";

interface IPaymentTypeCreationAttr {
  type_name: string;
}

@Table({ tableName: "payment_type", timestamps: false })
export class Payment_type extends Model<
  Payment_type,
  IPaymentTypeCreationAttr
> {
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
  type_name: string;

  @HasMany(() => Payment)
  payments: Payment[];
}
