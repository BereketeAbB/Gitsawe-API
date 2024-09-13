import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GitsaweDocument = Gitsawe & Document;

class VerseText {
  @Prop({ type: String })
  geez: string;

  @Prop({ type: String })
  english: string;

  @Prop({ type: String })
  amharic: string;
}

class Verse {
  @Prop({ type: String })
  bookTitle: string;

  @Prop({ type: Number })
  chapter: number;

  @Prop({ type: Number })
  start: number;

  @Prop({ type: Number })
  end: number;
}

class VerseType {
  @Prop({ type: VerseText, required: true })
  text: VerseText;

  @Prop({ type: Verse })
  verse: Verse;
}

@Schema()
export class Gitsawe {
  @Prop({ type: String, required: true, unique: true })
  date: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [VerseType] })
  negh: {
    msbak: VerseType[];
    wengel: VerseType[];
  };

  @Prop({ type: [VerseType] })
  kidassie: {
    msbak: VerseType[];
    firstDeacon: VerseType;
    secondDeacon: VerseType;
    secondKahn: VerseType;
    wengel: VerseType[];
    kidassie: string[];
  };
}

export const GitsaweSchema = SchemaFactory.createForClass(Gitsawe);
