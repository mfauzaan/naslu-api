import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginatedDto {
  @Expose()
  page: number;

  @Expose()
  perPage: number;

  @Expose()
  lastPage: number;

  @Expose()
  total: number;
}

export class PaginationOptionsDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  perPage?: number;
}
