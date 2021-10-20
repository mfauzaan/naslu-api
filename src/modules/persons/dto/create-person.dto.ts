import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  address: string;
}
