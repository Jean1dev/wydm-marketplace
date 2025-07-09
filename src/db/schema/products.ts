import { mysqlTable, varchar, int, decimal, timestamp } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products_wyd', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  quantity: int('quantity').notNull().default(0),
  sellerName: varchar('seller_name', { length: 255 }).notNull(),
  sellerReputation: int('seller_reputation').notNull().default(1),
  sellerFk: int('seller_fk').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert; 