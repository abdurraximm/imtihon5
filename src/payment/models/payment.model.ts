import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";
import { Payment_type } from "../../payment_type/models/payment_type.model";
import { Payment_status } from "../../payment_status/models/payment_status.model";

interface IPaymentCreationAttr {
  orderId: number;
  payment_typeId: number;
  payment_date: Date;
  payment_statusId: number;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  orderId: number;
  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Payment_type)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  payment_typeId: number;
  @BelongsTo(() => Payment_type)
  payment_type: Payment_type;

  @Column({
    type: DataType.DATEONLY,
  })
  payment_date: Date;

  @ForeignKey(() => Payment_status)
  @Column({
    type: DataType.INTEGER,
  })
  payment_statusId: number;
  @BelongsTo(()=>Payment_status)
  payment_status:Payment_status
}
