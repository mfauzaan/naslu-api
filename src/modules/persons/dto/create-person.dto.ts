import { IsString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  idCardNumber: string;
}
