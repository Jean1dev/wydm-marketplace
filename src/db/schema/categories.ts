import { mysqlTable, varchar, boolean, int } from 'drizzle-orm/mysql-core';

export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  emoji: varchar('emoji', { length: 10 }),
  categoriaExclusivaAdms: boolean('categoria_exclusiva_adms').default(false).notNull(),
});
