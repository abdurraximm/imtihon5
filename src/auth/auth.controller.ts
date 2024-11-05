import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { Request, Response } from "express";
import { SignInDto } from "../admins/dto/signin-admin.dto";
import { CookieGetter } from "../common/decorators/cookieGetter.decorator";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Auth for admin")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi adminni ro'yxatdan o'tkizish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yxatdan o'tgan admin",
    type: String,
  })
  @UseGuards(CreatorGuard)
  @Post("add")
  async signUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.addAdmin(createAdminDto, res);
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
    return this.authService.signin(signInDto, res);
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
    return this.authService.refreshtoken(refreshToken, res, +id);
  }

  @ApiOperation({ summary: "Tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Success sigout admin",
    type: Number,
  })
  @Post("signout/:id")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    return this.authService.signout(refreshToken, res, +id);
  }
}
