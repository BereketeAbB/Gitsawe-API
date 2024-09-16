import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users, packages, audit } from '../';
import { ESubscriptionStatus } from 'src/utils/enums';

export const subscriptionStatusEnum = pgEnum('subscription_status', [ESubscriptionStatus.ACTIVE, ESubscriptionStatus.CANCELLED, ESubscriptionStatus.EXPIRED, ESubscriptionStatus.INACTIVE, ESubscriptionStatus.PENDING, ESubscriptionStatus.SUSPENDED, ESubscriptionStatus.TERMINATED]); 

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  status: subscriptionStatusEnum('status').notNull().default(ESubscriptionStatus.PENDING),
  packageId: uuid('package_id').notNull().references(() => packages.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  ...audit
});