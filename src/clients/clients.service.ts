import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./models/client.model";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

import { Response } from "express";
import { SignInDto } from "./dto/signIn-client.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client) private readonly clientModel: typeof Client,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(client: Client) {
    const payload = {
      id: client.id,
      email: client.email,
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

  async updateRefreshToken(clientId: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
    await this.clientModel.update(
      { hashed_refresh_token },
      { where: { id: clientId } }
    );
  }

  async signup(createClientDto: CreateClientDto, res: Response) {
    const candidate = await this.clientModel.findOne({
      where: { email: createClientDto.email },
    });
    if (candidate) {
      throw new BadRequestException("Client already exists");
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 7);

    const newClient = await this.clientModel.create({
      ...createClientDto,
      hashed_password,
    });

    const activation_link = uuid.v4();    

    const updated_client = await this.clientModel.update({activation_link},{where:{id:newClient.id},returning:true})

    const tokens = await this.generateTokens(updated_client[1][0]);
    await this.updateRefreshToken(updated_client[1][0].id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMail(updated_client[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }

    return { id: newClient.id, access_token: tokens.access_token };
  }

  async activateUser(link: string) {
    const exists_client = await this.clientModel.findOne({
      where: { activation_link: link },
    });
    if (!exists_client) {
      throw new BadRequestException("Bunday client topilmadi");
    }
    if (exists_client.is_active) {
      throw new BadRequestException("Client activlashtirilgan");
    }

    this.clientModel.update(
      { is_active: true },
      { where: { id: exists_client.id } }
    );

    const response = {
      message: "User activlashtirildi",
      is_active: true,
    };
    return response;
  }

  async signin(singInDto: SignInDto, res: Response) {
    const candidate = await this.clientModel.findOne({
      where: { email: singInDto.email },
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

    const activation_link = uuid.v4();
    const updated_client = await this.clientModel.update(
      { activation_link },
      { where: { id: candidate.id },returning:true }
    );

    const tokens = await this.generateTokens(updated_client[1][0]);
    await this.updateRefreshToken(updated_client[1][0].id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMail(updated_client[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }

    return {
      id: updated_client[1][0].id,
      access_token: tokens.access_token,
    };
  }

  async refreshtoken(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const client = await this.clientModel.findByPk(payload.id);
      if (!client) {
        throw new UnauthorizedException("This client not found");
      }

      if (id !== client.id) {
        throw new BadRequestException("This another client");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        client.hashed_refresh_token
      );

      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      const tokens = await this.generateTokens(client);

      await this.updateRefreshToken(client.id, tokens.refresh_token);

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME,
      });

      return {
        id: client.id,
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

      const client = await this.clientModel.findByPk(payload.id);
      if (!client) {
        throw new UnauthorizedException("This client not found");
      }

      if (id !== client.id) {
        throw new BadRequestException("This another client");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        client.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      await this.clientModel.update(
        { hashed_refresh_token: "", activation_link: "" ,is_active:false},
        { where: { id: payload.id } }
      );

      return { message: "Client success signout", id: payload.id };
    } catch (error) {
      throw new BadRequestException("Internal server error");
    }
  }

  findAll() {
    return this.clientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.clientModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const updated_client = await this.clientModel.update(updateClientDto, {
      where: { id },
      returning: true,
    });
    return updated_client[1][0];
  }

  remove(id: number) {
    return this.clientModel.destroy({ where: { id } });
  }
}
