import { db } from '../connection';
import { usuarios } from '../schema/usuarios';
import { eq } from 'drizzle-orm';

export interface CreateUserData {
  idProvedorOAuth: string;
  nome: string;
  avatar?: string;
  emailProvedorExterno?: string;
}

export interface UserRecord {
  id: number;
  emailProvedorExterno: string | null;
  idProvedorOAuth: string | null;
  nome: string;
  avatar: string | null;
  dataCriacao: Date;
  dataUltimaVisita: Date | null;
  quantidadeInteracoes: number;
  aniversario: Date | null;
  instagram: string | null;
  whatsapp: string | null;
}

export async function findUserById(id: number): Promise<UserRecord | null> {
  const user = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.id, id))
    .limit(1);
  return user[0] || null;
}

export async function findUserByOAuthId(idProvedorOAuth: string): Promise<UserRecord | null> {
  const user = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.idProvedorOAuth, idProvedorOAuth))
    .limit(1);
  
  return user[0] || null;
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.emailProvedorExterno, email))
    .limit(1);
  
  return user[0] || null;
}

export async function createUser(userData: CreateUserData): Promise<UserRecord> {
  const [insertResult] = await db
    .insert(usuarios)
    .values({
      idProvedorOAuth: userData.idProvedorOAuth,
      nome: userData.nome,
      avatar: userData.avatar,
      emailProvedorExterno: userData.emailProvedorExterno,
      dataCriacao: new Date(),
      dataUltimaVisita: new Date(),
    });
  
  const newUser = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.id, insertResult.insertId))
    .limit(1);
  
  return newUser[0];
}

export async function updateLastVisit(userId: number): Promise<void> {
  await db
    .update(usuarios)
    .set({ dataUltimaVisita: new Date() })
    .where(eq(usuarios.id, userId));
}
