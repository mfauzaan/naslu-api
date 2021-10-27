import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Person, PersonDocument } from 'src/database/schemas/person.schema';
import { SerializerInterceptor } from 'src/utils/serializer.interceptor';
import { CreatePersonDto } from './dto/create-person.dto';
import {
  GetAllPersonsDto,
  GetAllPersonsOptionsDto,
} from './dto/get-all-persons.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonsService } from './persons.service';
import { GetPersonPipe } from './pipe/get-person.pipe';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @UseInterceptors(new SerializerInterceptor(GetAllPersonsDto))
  async findAll(
    @Query() options: GetAllPersonsOptionsDto,
  ): Promise<GetAllPersonsDto> {
    return this.personsService.findAll(options);
  }

  @Get(':id/relatives')
  // @UseInterceptors(new SerializerInterceptor(Person))
  async getRelatives(@Param('id', GetPersonPipe) person: PersonDocument) {
    return this.personsService.getRelatives(person);
  }

  @UseInterceptors(new SerializerInterceptor(Person))
  @Get(':id')
  show(@Param('id', GetPersonPipe) person: PersonDocument) {
    return person;
  }

  @Patch(':id')
  update(
    @Param('id', GetPersonPipe) person: PersonDocument,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personsService.update(person, updatePersonDto);
  }
}
