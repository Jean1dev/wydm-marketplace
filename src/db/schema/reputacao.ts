import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const reputacao = mysqlTable('reputacao', {
  id: int('id').primaryKey().autoincrement(),
  autorId: int('autor_id').notNull(),
  reputacao: int('reputacao').default(0).notNull(),
  respostasComunidade: int('respostas_comunidade').default(0).notNull(),
  badge: varchar('badge', { length: 100 }),
});
