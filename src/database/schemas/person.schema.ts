import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';

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

  @Prop()
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

  @Prop()
  @Expose()
  address: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
