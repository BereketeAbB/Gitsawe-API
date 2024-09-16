import { pgTable, text, varchar, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { audit } from '../audit.schema';
import { Many, relations, sql } from 'drizzle-orm';
import { ERole, EUserStatus } from 'src/utils/enums';
import { accounts } from './account.schema';

export const roleEnum = pgEnum('role', [ERole.USER, ERole.ADMIN]);
export const userStatusEnum = pgEnum('user_status', [EUserStatus.ACTIVE, EUserStatus.DRAFT,EUserStatus.INACTIVE]);

export const users = pgTable('users', {
  ...audit,
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`), 
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  email: varchar('email', { length: 255 }).unique(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull().unique(),
  role: roleEnum('role').notNull().default(ERole.USER),
  status: userStatusEnum('status').default(EUserStatus.DRAFT),
});

export const usersRelation = relations(users, ({ many }) =>({
    accounts: many(accounts)
  })
)
