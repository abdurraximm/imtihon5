import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignInDto } from './dto/signIn-client.dto';
import { CookieGetter } from '../common/decorators/cookieGetter.decorator';
import { JSON } from 'sequelize';
import { UserGuard } from '../common/guards/user.guard';

@ApiTags("Clients")
@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: "Register client" })
  @ApiResponse({
    status: 200,
    description: "Success registirated",
    type: JSON,
  })
  @Post("signup")
  signup(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientsService.signup(createClientDto, res);
  }

  @ApiOperation({ summary: "Activate user" })
  @ApiResponse({
    status: 200,
    description: "Success activated user",
    type: Object,
  })
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.clientsService.activateUser(link);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Success login",
    type: JSON,
  })
  @Post("signin")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientsService.signin(signInDto, res);
  }

  @ApiOperation({ summary: "Refresh tokenni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Success refreshed token",
    type: JSON,
  })
  @Post("refreshtoken/:id")
  async refreshToken(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    return this.clientsService.refreshtoken(refreshToken, res, +id);
  }

  @ApiOperation({ summary: "Tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Success sigout client",
    type: Number,
  })
  @Post("signout/:id")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    return this.clientsService.signout(refreshToken, res, +id);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientsService.remove(+id);
  }
}
