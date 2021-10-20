import { Expose, Type } from 'class-transformer';
import { Person } from 'src/database/schemas/person.schema';
import { PaginatedDto, PaginationOptionsDto } from 'src/dto/pagination.dto';

export class GetAllPersonsDto extends PaginatedDto {
  @Expose()
  @Type(() => Person)
  data: Person[];
}

export class GetAllPersonsOptionsDto extends PaginationOptionsDto {}
