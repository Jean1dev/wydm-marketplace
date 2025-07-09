import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';

export const contacts = mysqlTable('contacts_wyd', {
  id: int('id').primaryKey().autoincrement(),
  type: varchar('type', { length: 100 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  sellerFk: int('seller_fk').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert; 