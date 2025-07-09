import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';

export const seller = mysqlTable('seller_wyd', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  wydNickname: varchar('wyd_nickname', { length: 100 }).notNull(),
  totalSells: int('total_sells').notNull().default(0),
  totalReviews: int('total_reviews').notNull().default(0),
  reputation: int('reputation').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Seller = typeof seller.$inferSelect;
export type NewSeller = typeof seller.$inferInsert; 