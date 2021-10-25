import { Injectable, PipeTransform } from '@nestjs/common';
import { AddressDocument } from 'src/database/schemas/address.schema';
import { AddressService } from '../address.service';

@Injectable()
export class GetAddressPipe
  implements PipeTransform<string, Promise<AddressDocument>> {
  constructor(private readonly addressService: AddressService) {}

  async transform(id: string): Promise<AddressDocument> {
    return await this.addressService.findOne(id);
  }
}
