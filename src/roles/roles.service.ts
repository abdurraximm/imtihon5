import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleModel:typeof Role){}

  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.roleModel.findOne({where:{id},include:{all:true}});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updated_role = await this.roleModel.update(updateRoleDto,{where:{id},returning:true})
    return updated_role[1][0];
  }

  remove(id: number) {
    return this.roleModel.destroy({where:{id}});
  }
}
