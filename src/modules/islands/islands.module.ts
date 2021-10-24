import { Module } from '@nestjs/common';
import { IslandsService } from './islands.service';
import { IslandsController } from './islands.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Island, IslandSchema } from 'src/database/schemas/island.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
  ],
  controllers: [IslandsController],
  providers: [IslandsService],
})
export class IslandsModule {}
