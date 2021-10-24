import { IsObject } from 'class-validator';

export class CreateIslandDto {
  @IsObject()
  data: any;
}
