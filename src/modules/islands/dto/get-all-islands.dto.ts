import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Island } from 'src/database/schemas/island.schema';
import { PaginatedDto, PaginationOptionsDto } from 'src/dto/pagination.dto';

export class GetAllIslandsDto extends PaginatedDto {
  @Expose()
  @Type(() => Island)
  data: Island[];
}

export class GetAllIslandsOptionsDto extends PaginationOptionsDto {
  @IsOptional()
  @IsString()
  search: string;
}
