import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsMongoId()
  island: string;

  @IsString()
  address: string;

  @IsOptional()
  streetAddress: string;
}
