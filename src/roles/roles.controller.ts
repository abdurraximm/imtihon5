import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags("Roles of workers")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: "Add new role" })
  @ApiResponse({
    status: 201,
    description: "Added new role",
    type: Role,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({
    status: 200,
    description: "All roles",
    type: [Role],
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: "Get role by id" })
  @ApiResponse({
    status: 200,
    description: "Found role by id",
    type: Role,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOperation({ summary: "Update role by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated role",
    type: Role,
  })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Delete role by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted role",
    type: Number,
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
