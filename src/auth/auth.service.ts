import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminsService } from "../admins/admins.service";
import { Admin } from "../admins/models/admin.model";

import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { Response } from "express";
import { SignInDto } from "../admins/dto/signin-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin) private adminModel: typeof Admin
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      username: admin.username,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_ADMIN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(adminId: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
    await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: adminId } }
    );
  }

  async addAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const candidate = await this.adminModel.findOne({
      where: { username: createAdminDto.username },
    });
    if (candidate) {
      throw new BadRequestException("Admin already exists");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.generateTokens(newAdmin);
    await this.updateRefreshToken(newAdmin.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });
    return { id: newAdmin.id, access_token: tokens.access_token };
  }

  async signin(singInDto: SignInDto, res: Response) {
    const candidate = await this.adminModel.findOne({
      where: { username: singInDto.username },
    });
    if (!candidate) {
      throw new BadRequestException("Email or password invalid");
    }

    const valid_password = await bcrypt.compare(
      singInDto.password,
      candidate.hashed_password
    );
    if (!valid_password) {
      throw new BadRequestException("Email or password invalid");
    }

    const tokens = await this.generateTokens(candidate);
    await this.updateRefreshToken(candidate.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });
    return {
      id: candidate.id,
      access_token: tokens.access_token,
    };
  }

  async refreshtoken(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminModel.findByPk(payload.id);
      if (!admin) {
        throw new UnauthorizedException("This admin not found");
      }

      if (id !== admin.id) {
        throw new BadRequestException("This another admin");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token
      );

      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      const tokens = await this.generateTokens(admin);

      await this.updateRefreshToken(admin.id, tokens.refresh_token);

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME,
      });

      return {
        id: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException("Expired token");
    }
  }

  async signout(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminModel.findByPk(payload.id);
      if (!admin) {
        throw new UnauthorizedException("This admin not found");
      }

      if (id !== admin.id) {
        throw new BadRequestException("This another admin");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      await this.adminModel.update(
        { hashed_refresh_token: "" },
        { where: { id: payload.id } }
      );

      return { message: "Admin success signout", id: payload.id };
    } catch (error) {
      throw new BadRequestException("Internal server error");
    }
  }
}
