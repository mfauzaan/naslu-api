import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Address } from 'src/database/schemas/address.schema';
import { PaginatedDto, PaginationOptionsDto } from 'src/dto/pagination.dto';

export class GetAllAddressDto extends PaginatedDto {
  @Expose()
  @Type(() => Address)
  data: Address[];
}

export class GetAllAddressOptionsDto extends PaginationOptionsDto {
  @IsOptional()
  @IsString()
  search: string;
}
