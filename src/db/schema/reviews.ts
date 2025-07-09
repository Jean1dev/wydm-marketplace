import { mysqlTable, varchar, int, text, timestamp } from 'drizzle-orm/mysql-core';

export const reviews = mysqlTable('reviews_wyd', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull(),
  rating: int('rating').notNull(),
  observation: text('observation'),
  sellerFk: int('seller_fk').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert; 