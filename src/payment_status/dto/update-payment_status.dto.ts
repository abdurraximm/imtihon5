import { PartialType } from '@nestjs/swagger';
import { CreatePaymentStatusDto } from './create-payment_status.dto';

export class UpdatePaymentStatusDto extends PartialType(CreatePaymentStatusDto) {}
