import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from 'src/database/schemas/address.schema';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetAllAddressOptionsDto } from './dto/get-all-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { identity, pickBy } from 'lodash';
import { isMongoId } from 'class-validator';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: Model<AddressDocument>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.addressModel.create(createAddressDto);
  }

  async findAll(options: GetAllAddressOptionsDto) {
    try {
      const { perPage = 30, page = 1, search } = options;

      const [data, count] = await Promise.all([
        this.addressModel
          .find(
            pickBy(
              {
                address: search && { $regex: `.*${search}.*`, $options: 'i' },
              },
              identity,
            ),
          )
          .limit(perPage)
          .skip(perPage * (page - 1))
          .where(options)
          .sort({
            atoll: 'asc',
          })
          .populate('island')
          .exec(),
        this.addressModel.count(
          pickBy(
            {
              address: search && { $regex: `.*${search}.*`, $options: 'i' },
            },
            identity,
          ),
        ),
      ]);

      return {
        total: count,
        perPage,
        page: page,
        lastPage: Math.ceil(count / perPage),
        data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<AddressDocument> {
    if (!id || !isMongoId(id)) {
      throw new UnprocessableEntityException([
        'Validation failed (uuid  is expected)',
      ]);
    }

    const address = await this.addressModel.findById(id).exec();

    if (!address) throw new BadRequestException('Address not found');

    return address;
  }

  async update(address: AddressDocument, updateAddressDto: UpdateAddressDto) {
    await address.updateOne(updateAddressDto);
    return address;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
