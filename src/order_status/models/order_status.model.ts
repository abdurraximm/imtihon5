import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";

interface IOrderStatusCreationAttr {
  status: boolean;
  orderId: number;
}

@Table({ tableName: "order_status", timestamps: false })
export class OrderStatus extends Model<OrderStatus, IOrderStatusCreationAttr> {
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

  @ForeignKey(()=>Order)
  @Column({
    type: DataType.INTEGER,
  })
  orderId: number;
  @BelongsTo(()=>Order)
  order:Order
}
