import { mysqlTable, text, int, datetime, varchar } from 'drizzle-orm/mysql-core';

export const interacoes = mysqlTable('interacoes', {
  id: int('id').primaryKey().autoincrement(),
  descricao: text('descricao').notNull(),
  autorId: int('autor_id').notNull(),
  autorNome: varchar('autor_nome', { length: 255 }).notNull(),
  autorAvatar: varchar('autor_avatar', { length: 500 }),
  postId: int('post_id').notNull(),
  dataCriacao: datetime('data_criacao').notNull(),
});
