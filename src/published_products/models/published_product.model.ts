import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";

interface IPublishedProductCreationAttr {
  orderId: number;
}

@Table({ tableName: "published_product", timestamps: false })
export class PublishedProduct extends Model<
  PublishedProduct,
  IPublishedProductCreationAttr
> {
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
  @BelongsTo(()=>Order)
  order:Order
}
