import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin){}

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updated_admin = await this.adminModel.update(updateAdminDto,{where:{id},returning:true});
    return updated_admin[1][0]
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}});
  }
}
