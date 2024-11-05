import { PartialType } from '@nestjs/swagger';
import { CreatePublishedProductDto } from './create-published_product.dto';

export class UpdatePublishedProductDto extends PartialType(CreatePublishedProductDto) {}
