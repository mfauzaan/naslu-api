import { Injectable, PipeTransform } from '@nestjs/common';
import { PersonDocument } from 'src/database/schemas/person.schema';
import { PersonsService } from '../persons.service';

@Injectable()
export class GetPersonPipe
  implements PipeTransform<string, Promise<PersonDocument>> {
  constructor(private readonly personsService: PersonsService) {}

  async transform(id: string): Promise<PersonDocument> {
    return await this.personsService.findOne(id);
  }
}
