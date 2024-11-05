import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product_type } from "../../product_type/models/product_type.model";
import { INTEGER } from "sequelize";
import { Order } from "../../orders/models/order.model";

interface IProductCreationAttr {
  type_name: string;
  product_typeId: number;
}

@Table({ tableName: "products", timestamps: false })
export class Products extends Model<
  Products,
  IProductCreationAttr
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
  })
  descriptions: string;

  @ForeignKey(()=>Product_type)
  @Column({
    type:DataType.INTEGER
  })
  product_typeId:number
  @BelongsTo(()=>Product_type)
  product_type:Product_type

  @HasMany(()=>Order)
  orders:Order[]
}
