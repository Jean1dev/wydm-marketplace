import { findUserByEmail } from '@/db/queries/usuarios';

export interface GetAuthorByEmailRequest {
  email: string;
}

export interface GetAuthorByEmailResponse {
  success: boolean;
  data?: {
    id: number;
    nome: string;
    email: string;
    avatar?: string;
  };
  error?: string;
}

export const getAuthorByEmail = async (email: string): Promise<GetAuthorByEmailResponse> => {
  try {

    const user = await findUserByEmail(email.trim());

    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    return {
      success: true,
      data: {
        id: user.id,
        nome: user.nome,
        email: user.emailProvedorExterno || email,
        avatar: user.avatar || undefined,
      }
    };

  } catch (error) {
    console.error('Erro ao buscar autor por email:', error);
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
};
