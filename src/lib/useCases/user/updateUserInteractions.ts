import { db } from '@/db';
import { usuarios } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export interface UpdateUserInteractionsRequest {
  userId: number;
}

export interface UpdateUserInteractionsResponse {
  success: boolean;
  error?: string;
}

const validateUserId = (userId: number): string | null => {
  if (!userId || userId <= 0) {
    return 'ID do usuário é obrigatório';
  }
  return null;
};

const incrementUserInteractions = async (userId: number) => {
  const result = await db
    .update(usuarios)
    .set({ 
      quantidadeInteracoes: sql`${usuarios.quantidadeInteracoes} + 1`
    })
    .where(eq(usuarios.id, userId));

  return result;
};

const createSuccessResponse = (): UpdateUserInteractionsResponse => ({
  success: true
});

const createErrorResponse = (error: string): UpdateUserInteractionsResponse => ({
  success: false,
  error
});

export const updateUserInteractions = async (request: UpdateUserInteractionsRequest): Promise<UpdateUserInteractionsResponse> => {
  try {
    const { userId } = request;

    const userIdError = validateUserId(userId);
    if (userIdError) return createErrorResponse(userIdError);

    await incrementUserInteractions(userId);

    return createSuccessResponse();

  } catch (error) {
    console.error('Erro ao atualizar interações do usuário:', error);
    return createErrorResponse('Erro interno do servidor');
  }
};
