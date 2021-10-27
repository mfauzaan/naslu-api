import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { Person, PersonDocument } from 'src/database/schemas/person.schema';
import { CreatePersonDto } from './dto/create-person.dto';
import {
  GetAllPersonsDto,
  GetAllPersonsOptionsDto,
} from './dto/get-all-persons.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { pickBy, identity, compact } from 'lodash';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const isExist = await this.personModel.findOne({
      idCardNumber: createPersonDto.idCardNumber,
    });

    if (isExist)
      throw new UnprocessableEntityException(['Person already exists']);

    return await this.personModel.create(createPersonDto);
  }

  async findAll(options: GetAllPersonsOptionsDto): Promise<GetAllPersonsDto> {
    try {
      const { perPage = 30, page = 1, search, gender } = options;

      // Filters
      const filterOptions = pickBy(
        {
          $or: search && [
            {
              firstName: search && {
                $regex: `.*${search}.*`,
                $options: 'i',
              },
            },
            {
              lastName: search && {
                $regex: `.*${search}.*`,
                $options: 'i',
              },
            },
            {
              idCardNumber: search && {
                $regex: `.*${search}.*`,
                $options: 'i',
              },
            },
          ],
          gender,
        },
        identity,
      );

      const [data, count] = await Promise.all([
        this.personModel
          .find(filterOptions)
          .limit(perPage)
          .skip(perPage * (page - 1))
          .where(options)
          .sort({
            createdAt: 'desc',
          })
          .populate({
            path: 'address',
            populate: {
              path: 'island',
            },
          })
          .exec(),
        this.personModel.count(pickBy(filterOptions)),
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

  async findOne(id: string): Promise<PersonDocument> {
    if (!id || !isMongoId(id)) {
      throw new UnprocessableEntityException([
        'Validation failed (uuid  is expected)',
      ]);
    }

    const person = await this.personModel.findById(id).exec();

    if (!person) throw new BadRequestException('Person not found');

    return person;
  }

  async getRelatives(person: PersonDocument) {
    const [relatives, children] = await Promise.all([
      await person.populate(['father', 'mother']),
      this.personModel.find({
        father: person.father || '61752567dd11e185ed1cae61',
        mother: person.mother || '61752567dd11e185ed1cae61',
        _id: {
          $ne: person._id,
        },
      }) as any,
    ]);

    if (relatives.father) {
      relatives.father['__v'] = true;
    }

    if (relatives.mother) {
      relatives.mother['__v'] = true;
    }

    children.unshift(...[relatives.father, relatives.mother]);

    return compact(children);
  }

  async update(person: PersonDocument, updatePersonDto: UpdatePersonDto) {
    await person.updateOne(updatePersonDto);
    return person;
  }
}
