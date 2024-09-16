import { pgTable, uuid, text, pgEnum, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { EAccountStatus, EAccountType } from 'src/utils/enums';
import { audit, users } from '../';
import { relations, sql } from 'drizzle-orm';

export const accountStatusEnum = pgEnum('account_status', [EAccountStatus.ACTIVE, EAccountStatus.DRAFT, EAccountStatus.INACTIVE]);
export const accountTypeEnum = pgEnum('account_type', [EAccountType.EMAIL, EAccountType.TELEGRAM_BOT]);


export const accounts = pgTable("accounts", {
    ...audit,
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), 
  username: varchar("username", { length: 255 }).notNull().unique(),
  type: accountTypeEnum("type").notNull(),
  password: text("password").notNull(),
  userId: uuid("user_id").notNull(), 
  status: accountStatusEnum("status").default(EAccountStatus.DRAFT).notNull(),
  otp: text("otp"), 
  createdAt: timestamp("created_at").notNull().defaultNow(), 
});

export const accountsRelation = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  })
})
)


