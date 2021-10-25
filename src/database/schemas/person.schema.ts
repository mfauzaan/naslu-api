import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PersonDocument = Person & Document;

@Schema({ timestamps: true, collection: 'persons' })
export class Person {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  firstName: string;

  @Prop()
  @Expose()
  lastName: string;

  @Prop({
    type: MongooseSchema.Types.Date,
  })
  @Expose()
  dob: Date;

  @Prop({
    unique: true,
  })
  @Expose()
  idCardNumber: string;

  @Prop()
  @Expose()
  gender: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Address',
  })
  @Expose()
  address: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
