import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ESubscriptionStatus } from 'src/utils/enums/subscription.enum';
import { Audit } from 'src/utils/schemas/audit.schema';
import { Package } from './package.schema';
import { User } from './user.schema';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription extends Audit {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true, enum: ESubscriptionStatus, default: ESubscriptionStatus.PENDING })
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true  })
    packageId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Schema.Types.ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);