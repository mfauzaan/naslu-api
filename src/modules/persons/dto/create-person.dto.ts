import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  idCardNumber: string;

  @IsString()
  firstName: string;

  @IsOptional()
  lastName: string;

  @Type(() => Date)
  @IsDate()
  dob: Date;

  @IsString()
  gender: string;

  @IsMongoId()
  address: string;

  @IsMongoId()
  father: string;

  @IsMongoId()
  mother: string;
}
