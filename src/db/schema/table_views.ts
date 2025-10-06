import { int, mysqlTable, mysqlEnum } from 'drizzle-orm/mysql-core';
import { posts } from './posts';

export const tableViews = mysqlTable('table_views', {
  id: int('id').primaryKey().autoincrement(),
  postId: int('post_id').notNull().references(() => posts.id),
  contadorViews: int('contador_views').notNull().default(0),
});
