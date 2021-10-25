import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AddressDocument } from 'src/database/schemas/address.schema';
import { SerializerInterceptor } from 'src/utils/serializer.interceptor';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import {
  GetAllAddressDto,
  GetAllAddressOptionsDto,
} from './dto/get-all-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { GetAddressPipe } from './pipe/get-person.pipe';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @UseInterceptors(new SerializerInterceptor(GetAllAddressDto))
  async findAll(
    @Query() options: GetAllAddressOptionsDto,
  ): Promise<GetAllAddressDto> {
    return this.addressService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', GetAddressPipe) address: AddressDocument,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(address, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
