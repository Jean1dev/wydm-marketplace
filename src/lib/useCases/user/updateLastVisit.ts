import { getUserByOAuthId } from './getUserByOAuthId';
import { updateLastVisit } from '@/db/queries/usuarios';

export interface UpdateLastVisitRequest {
  oauthId: string;
}

export interface UpdateLastVisitResponse {
  success: boolean;
  userId?: number;
  error?: string;
}

export async function updateUserLastVisit(request: UpdateLastVisitRequest): Promise<UpdateLastVisitResponse> {
  try {
    if (!request.oauthId) {
      return {
        success: false,
        error: 'OAuth ID não fornecido'
      };
    }

    const userResult = await getUserByOAuthId({ oauthId: request.oauthId });
    
    if (!userResult.success || !userResult.user) {
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    console.log('Atualizando última visita para usuário:', userResult.user.id);
    await updateLastVisit(userResult.user.id);

    return {
      success: true,
      userId: userResult.user.id
    };
  } catch (error) {
    console.error('Erro ao atualizar última visita:', error);
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}
