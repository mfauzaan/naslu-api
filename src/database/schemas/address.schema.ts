import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true, collection: 'address' })
export class Address {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  address: string;

  @Prop()
  @Expose()
  streetAddress: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Island',
  })
  @Expose()
  island: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
