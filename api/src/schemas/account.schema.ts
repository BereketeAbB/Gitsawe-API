import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Audit } from "src/utils/schemas/audit.schema";
import mongoose from "mongoose";
import { EAccountType } from "src/utils/enums/account.enum";

export type AccountDocument = Account & Document;

@Schema()
export class Account extends Audit {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, enum: EAccountType })
    type: EAccountType;

    @Prop({ required: true })
    password: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Schema.Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);