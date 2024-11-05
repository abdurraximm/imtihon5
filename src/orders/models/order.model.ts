import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Products } from "../../products/models/product.model";
import { Client } from "../../clients/models/client.model";
import { DateOnlyDataType } from "sequelize";
import { Payment } from "../../payment/models/payment.model";
import { OrderStatus } from "../../order_status/models/order_status.model";
import { PublishedProduct } from "../../published_products/models/published_product.model";

interface IOrderCreationAttr {
  clientId: number;
  productId: number;
  product_about: string;
  deadline: Date;
  amount: number;
  total_price: number;
  additional_comment:string
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, IOrderCreationAttr> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  clientId: number;
  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  productId: number;
  @BelongsTo(() => Products)
  product: Products;

  @Column({
    type: DataType.STRING,
  })
  product_about: string;

  @Column({
    type: DataType.DATEONLY,
  })
  deadline: Date;

  @Column({
    type: DataType.INTEGER,
  })
  amount: number;

  @Column({
    type: DataType.DECIMAL,
  })
  total_price: number;

  @Column({
    type: DataType.STRING,
  })
  additional_comment: string;

  @HasMany(()=>Payment)
  payments:Payment[]

  @HasMany(()=>OrderStatus)
  order_status:OrderStatus[]

  @HasMany(()=>PublishedProduct)
  published_products:PublishedProduct[]
}
