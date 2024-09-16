import { timestamp } from "drizzle-orm/pg-core";

export const audit = {
    createdAt: timestamp("createdAt", { precision: 6, mode: 'string', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { precision: 6, mode: 'string', withTimezone: true}).defaultNow().notNull(),
    deletedAt: timestamp("deletedAt", { precision: 6, mode: 'string', withTimezone: true }),
}
