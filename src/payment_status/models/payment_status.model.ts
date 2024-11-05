import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Payment } from "../../payment/models/payment.model";

interface IPaymentStatusCreationAttr {
  status: boolean;
}

@Table({ tableName: "payment_status", timestamps: false })
export class Payment_status extends Model<
  Payment_status,
  IPaymentStatusCreationAttr
> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  status: boolean;

  @HasMany(()=>Payment)
  payments:Payment[]
}
