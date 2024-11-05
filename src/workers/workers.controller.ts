import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Worker } from './models/worker.model';
import { Response } from 'express';
import { JSON } from 'sequelize';
import { SignInDto } from './dto/signIn-worker.dto';
import { CookieGetter } from '../common/decorators/cookieGetter.decorator';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags("Workers")
@Controller("workers")
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @ApiOperation({ summary: "Add new worker" })
  @ApiResponse({
    status: 201,
    description: "Added new worker",
    type: JSON,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.workersService.create(createWorkerDto, res);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Success login",
    type: String,
  })
  @Post("signin")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.workersService.signin(signInDto, res);
  }

  @ApiOperation({ summary: "Refresh tokenni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Success refreshed token",
    type: String,
  })
  @Post("refreshtoken/:id")
  async refreshToken(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    return this.workersService.refreshtoken(refreshToken, res, +id);
  }

  @ApiOperation({ summary: "Tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Success sigout worker",
    type: Number,
  })
  @Post("signout/:id")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    return this.workersService.signout(refreshToken, res, +id);
  }

  @ApiOperation({ summary: "Get all workers" })
  @ApiResponse({
    status: 200,
    description: "All workers",
    type: [Worker],
  })
  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @ApiOperation({ summary: "Get worker by id" })
  @ApiResponse({
    status: 200,
    description: "Found worker by id",
    type: Worker,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workersService.findOne(+id);
  }

  @ApiOperation({ summary: "Update worker by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated worker",
    type: Worker,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(+id, updateWorkerDto);
  }

  @ApiOperation({ summary: "Delete worker by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted worker",
    type: Number,
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workersService.remove(+id);
  }
}
