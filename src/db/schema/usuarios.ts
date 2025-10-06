import { mysqlTable, varchar, int, datetime, date } from 'drizzle-orm/mysql-core';

export const usuarios = mysqlTable('usuarios', {
  id: int('id').primaryKey().autoincrement(),
  emailPlataformaCrypto: varchar('email_plataforma_crypto', { length: 255 }),
  emailProvedorExterno: varchar('email_provedor_externo', { length: 255 }),
  idProvedorOAuth: varchar('id_provedor_oauth', { length: 255 }),
  nome: varchar('nome', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 500 }),
  dataCriacao: datetime('data_criacao').notNull(),
  dataUltimaVisita: datetime('data_ultima_visita'),
  quantidadeInteracoes: int('quantidade_interacoes').default(0).notNull(),
  aniversario: date('aniversario'),
  instagram: varchar('instagram', { length: 255 }),
  whatsapp: varchar('whatsapp', { length: 20 }),
});
