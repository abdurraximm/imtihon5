import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateWorkerDto } from "./dto/create-worker.dto";
import { UpdateWorkerDto } from "./dto/update-worker.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Worker } from "./models/worker.model";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { Response } from "express";
import { SignInDto } from "./dto/signIn-worker.dto";

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker) private readonly workerModel: typeof Worker,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(worker: Worker) {
    const payload = {
      id: worker.id,
      full_name: worker.full_name,
      is_active: worker.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(workerId: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
    await this.workerModel.update(
      { hashed_refresh_token },
      { where: { id: workerId } }
    );
  }

  async create(createWorkerDto: CreateWorkerDto, res: Response) {
    const candidate = await this.workerModel.findOne({
      where: { phone_number: createWorkerDto.phone_number },
    });
    if (candidate) {
      throw new BadRequestException("Already exists this phone number");
    }

    if (createWorkerDto.password !== createWorkerDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);

    const newWorker = await this.workerModel.create({
      ...createWorkerDto,
      hashed_password,
    });

    const tokens = await this.generateTokens(newWorker);
    await this.updateRefreshToken(newWorker.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return { id: newWorker.id, access_token: tokens.access_token };
  }

  async signin(singInDto: SignInDto, res: Response) {
    const candidate = await this.workerModel.findOne({
      where: { full_name: singInDto.full_name },
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

      const worker = await this.workerModel.findByPk(payload.id);
      if (!worker) {
        throw new UnauthorizedException("This worker not found");
      }

      if (id !== worker.id) {
        throw new BadRequestException("This another admin");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        worker.hashed_refresh_token
      );

      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      const tokens = await this.generateTokens(worker);

      await this.updateRefreshToken(worker.id, tokens.refresh_token);

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME,
      });

      return {
        id: worker.id,
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

      const admin = await this.workerModel.findByPk(payload.id);
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

      await this.workerModel.update(
        { hashed_refresh_token: "" },
        { where: { id: payload.id } }
      );

      return { message: "Worker success signout", id: payload.id };
    } catch (error) {
      throw new BadRequestException("Internal server error");
    }
  }

  findAll() {
    return this.workerModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.workerModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    const updated_worker = await this.workerModel.update(updateWorkerDto, {
      where: { id },
      returning: true,
    });
    return updated_worker[1][0];
  }

  remove(id: number) {
    return this.workerModel.destroy({ where: { id } });
  }
}
