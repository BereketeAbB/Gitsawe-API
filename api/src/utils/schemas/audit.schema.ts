import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditDocument = Audit & Document;

@Schema()
export class Audit {
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: null })
    deletedAt: Date;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
