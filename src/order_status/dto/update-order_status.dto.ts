import { PartialType } from '@nestjs/swagger';
import { CreateOrderStatusDto } from './create-order_status.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {}
