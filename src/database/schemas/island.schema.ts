import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';

export type IslandDocument = Island & Document;

@Schema({ timestamps: true, collection: 'islands' })
export class Island {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  name: string;

  @Prop()
  @Expose()
  atoll: string;
}

export const IslandSchema = SchemaFactory.createForClass(Island);
