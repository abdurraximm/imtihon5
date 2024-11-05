import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Role } from "../../roles/models/role.model"

interface IWorkerCreationAttr{
    full_name:string
    roleId:number
    phone_number:string
    hashed_password:string
    hashed_refresh_token:string
    is_active:boolean
}

@Table({ tableName: "workers", timestamps: false })
export class Worker extends Model<Worker, IWorkerCreationAttr> {
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
  full_name: string;

  @ForeignKey(()=>Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;
  @BelongsTo(()=>Role)
  role:Role

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique:true
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;
}
