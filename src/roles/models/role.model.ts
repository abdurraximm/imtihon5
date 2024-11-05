import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Worker } from "../../workers/models/worker.model";

interface IRoleCreationAttr {
  role_name: string;
}

@Table({ tableName: "roles", timestamps: false })
export class Role extends Model<Role, IRoleCreationAttr> {
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
  role_name: string;

  @HasMany(()=>Worker)
  workers:Worker[]
}
