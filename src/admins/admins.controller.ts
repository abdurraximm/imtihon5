import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { CreatorGuard } from '../common/guards/creator.guard';
import { AdminSelfGuard } from '../common/guards/admin-self.guard';


@ApiTags("Admins")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({
    status: 200,
    description: "All admins",
    type: [Admin],
  })
  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "Get admin by id" })
  @ApiResponse({
    status: 200,
    description: "Admin by id",
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update admin by id" })
  @ApiResponse({
    status: 200,
    description: "Updated admin",
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Delete admin by id" })
  @ApiResponse({
    status: 200,
    description: "Deleted admin",
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
