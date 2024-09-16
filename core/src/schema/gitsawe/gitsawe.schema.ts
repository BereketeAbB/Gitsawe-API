import { pgTable, serial, text, json } from 'drizzle-orm/pg-core';

type VerseText = {
  geez: string;
  english: string;
  amharic: string;
};

type Verse = {
  bookTitle: string;
  chapter: number;
  start: any;
  end: any;
};

type VerseType = {
  text: VerseText;
  verse: Verse;
};

type Negh = {
  msbak: VerseType[];
  wengel: VerseType[];
};

type Kidassie = {
  msbak: VerseType[];
  firstDeacon: VerseType;
  secondDeacon: VerseType;
  secondKahn: VerseType;
  wengel: VerseType[];
  kidassie: string[];
};

export const gitsawe = pgTable('gitsawe', {
  id: serial('id').primaryKey(),
  date: text('date').notNull().unique(),
  title: text('title').notNull(),
  negh: json('negh').$type<Negh>().notNull(),
  kidassie: json('kidassie').$type<Kidassie>().notNull()
});