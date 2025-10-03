import { mysqlTable, varchar, text, boolean, int, datetime } from 'drizzle-orm/mysql-core';

export const posts = mysqlTable('posts', {
  id: int('id').primaryKey().autoincrement(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  descricao: text('descricao').notNull(),
  descricaoTruncada: varchar('descricao_truncada', { length: 500 }),
  dataCriacao: datetime('data_criacao').notNull(),
  dataAtualizacao: datetime('data_atualizacao'),
  estaBloqueado: boolean('esta_bloqueado').default(false).notNull(),
  estaVisivel: boolean('esta_visivel').default(true).notNull(),
  autorId: int('autor_id').notNull(),
  autorNome: varchar('autor_nome', { length: 255 }).notNull(),
  autorAvatar: varchar('autor_avatar', { length: 500 }),
  categoriaId: int('categoria_id').notNull(),
});
