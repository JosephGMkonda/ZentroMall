import {PartialType} from '@nestjs/mapped-types';
import {CreateShopDto} from './create-shops.dto';

export class UpdateShopsDto extends PartialType(CreateShopDto){}


