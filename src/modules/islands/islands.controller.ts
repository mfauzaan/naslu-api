import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SerializerInterceptor } from 'src/utils/serializer.interceptor';
import { CreateIslandDto } from './dto/create-island.dto';
import {
  GetAllIslandsDto,
  GetAllIslandsOptionsDto,
} from './dto/get-all-islands.dto';
import { IslandsService } from './islands.service';

@Controller('islands')
export class IslandsController {
  constructor(private readonly islandsService: IslandsService) {}

  @Post()
  create(@Body() createIslandDto: CreateIslandDto) {
    return this.islandsService.create(createIslandDto);
  }

  @Get()
  @UseInterceptors(new SerializerInterceptor(GetAllIslandsDto))
  async findAll(
    @Query() options: GetAllIslandsOptionsDto,
  ): Promise<GetAllIslandsDto> {
    return this.islandsService.findAll(options);
  }
}
