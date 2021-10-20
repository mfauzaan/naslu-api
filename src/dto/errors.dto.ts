import { Expose } from 'class-transformer';

export class ApiErrorDto {
  @Expose()
  status: number;

  @Expose()
  error: string;

  @Expose()
  message: string;
}
