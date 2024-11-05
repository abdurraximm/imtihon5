import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Products } from "../../products/models/product.model";

interface IProductTypeCreationAttr {
  type_name: string;
}

@Table({ tableName: "product_type", timestamps: false })
export class Product_type extends Model<
  Product_type,
  IProductTypeCreationAttr
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

  @HasMany(()=>Products)
  products:Products[]
}
