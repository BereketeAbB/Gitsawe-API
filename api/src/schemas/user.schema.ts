import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Audit } from 'src/utils/schemas/audit.schema';
import { Subscription } from './subscription.schema';

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

// export const UserSchema = UserSchemaItem