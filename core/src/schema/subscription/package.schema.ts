import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { audit } from '../';

export const packages = pgTable('packages', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
  dateInterval: varchar('date_interval', { length: 255 }).notNull(),
  mediaType: varchar('media_type', { length: 255 }).notNull(),
  day: varchar('day', { length: 255 }),
...audit
});