import { findUserByOAuthId } from '@/db/queries/usuarios';

export interface GetUserByOAuthIdRequest {
  oauthId: string;
}

export interface GetUserByOAuthIdResponse {
  success: boolean;
  user?: {
    id: number;
    nome: string;
    emailProvedorExterno?: string;
    avatar?: string;
    dataCriacao: Date;
    dataUltimaVisita?: Date;
  };
  error?: string;
}

export async function getUserByOAuthId(request: GetUserByOAuthIdRequest): Promise<GetUserByOAuthIdResponse> {
  try {
    if (!request.oauthId) {
      return {
        success: false,
        error: 'OAuth ID não fornecido'
      };
    }

    const user = await findUserByOAuthId(request.oauthId);
    
    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        nome: user.nome,
        emailProvedorExterno: user.emailProvedorExterno || undefined,
        avatar: user.avatar || undefined,
        dataCriacao: user.dataCriacao,
        dataUltimaVisita: user.dataUltimaVisita || undefined
      }
    };
  } catch (error) {
    console.error('Erro ao buscar usuário por OAuth ID:', error);
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}
