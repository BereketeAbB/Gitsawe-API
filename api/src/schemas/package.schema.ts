import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Audit } from "src/utils/schemas/audit.schema";
import { Subscription } from "./subscription.schema";
import mongoose from "mongoose";

export type PackageDocument = Package & Document;

@Schema()
export class Package extends Audit {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true })
    dateInterval: string;

    @Prop({ required: true })
    mediaType: string;

    @Prop({ required: false })
    day: string;
}

export const PackageSchema = SchemaFactory.createForClass(Package);

PackageSchema.virtual('accounts', {
    ref: 'Subscription',
    localField: '_id',
    foreignField: 'packageId',
    justOne: false,
  });