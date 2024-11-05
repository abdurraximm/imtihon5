import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Client } from "../clients/models/client.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(client: Client) {
    
    const url = `${process.env.API_URL}:${process.env.PORT}/api/clients/activate/${client.activation_link}`;
    await this.mailerService.sendMail({
      to: client.email,
      subject: "Publisher housega xush kelibsiz",
      template: "./confirm",
      context: {
        first_name: client.first_name,
        url: url,
      },
    });
  }
}
