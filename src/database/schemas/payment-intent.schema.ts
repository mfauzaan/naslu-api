import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';

export type PaymentIntentDocument = PaymentIntent & Document;
export const Enum = {
  status: ['processing', 'failed', 'success'],
};

@Schema({ timestamps: true })
export class PaymentIntent {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  entity: string;

  @Prop()
  @Expose()
  entityId: string;

  @Prop()
  @Expose()
  paymentMethodId: string;

  @Prop()
  @Expose()
  description: string;

  @Prop()
  amount: number;

  @Prop({
    default: 'processing',
    enum: Enum.status,
  })
  status: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

export const PaymentIntentSchema = SchemaFactory.createForClass(PaymentIntent);
