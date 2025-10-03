import { mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';

export const midias = mysqlTable('midias', {
  id: int('id').primaryKey().autoincrement(),
  urlMidia: varchar('url_midia', { length: 500 }).notNull(),
  postId: int('post_id').notNull(),
});
