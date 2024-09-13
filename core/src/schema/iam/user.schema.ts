import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Audit } from 'src/utils/schemas/audit.schema';
import { Subscription } from './subscription.schema';
import { ERole, EUserStatus } from 'src/utils/enums/account.enum';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        getters: true
    }
})
export class User extends Audit {
    @Prop({ required: true })
    firstName: string;
    
    @Prop({ required: false })
    lastName: string;
    
    @Prop({ required: false, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;

    @Prop({ required: true, unique: true, enum: ERole, default: ERole.USER })
    role: ERole;

    @Prop({ enum: EUserStatus, default: EUserStatus.DRAFT})
    status: EUserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('subscriptions', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});

UserSchema.virtual('accounts', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});