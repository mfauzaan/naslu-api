import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Island, IslandDocument } from 'src/database/schemas/island.schema';
import { CreateIslandDto } from './dto/create-island.dto';
import { GetAllIslandsOptionsDto } from './dto/get-all-islands.dto';
import { pickBy, identity } from 'lodash';

@Injectable()
export class IslandsService {
  constructor(
    @InjectModel(Island.name)
    private islandModel: Model<IslandDocument>,
  ) {}

  async create(createIslandDto: CreateIslandDto) {
    const { data } = createIslandDto;

    for (const [_, value] of Object.entries(data)) {
      await this.islandModel.create(value);
    }
  }

  async findAll(options: GetAllIslandsOptionsDto) {
    try {
      const { perPage = 30, page = 1, search } = options;

      const [data, count] = await Promise.all([
        this.islandModel
          .find(
            pickBy(
              {
                name: search && { $regex: `.*${search}.*`, $options: 'i' },
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
          .exec(),
        this.islandModel.count(
          pickBy(
            {
              name: search && { $regex: `.*${search}.*`, $options: 'i' },
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
}
