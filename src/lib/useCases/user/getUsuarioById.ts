import { findUserById } from '@/db/queries/usuarios';

export interface GetUsuarioByIdRequest {
  id: number;
}

export interface PerfilPublicoData {
  id: number;
  nome: string;
  avatar: string | null;
  dataCriacao: string;
  quantidadeInteracoes: number;
  aniversario: string | null;
  instagram: string | null;
  whatsapp: string | null;
}

export interface GetUsuarioByIdResponse {
  success: boolean;
  data?: PerfilPublicoData;
  error?: string;
}

export async function getUsuarioById(request: GetUsuarioByIdRequest): Promise<GetUsuarioByIdResponse> {
  try {
    const { id } = request;
    if (!id || id <= 0) {
      return { success: false, error: 'ID inválido' };
    }
    const user = await findUserById(id);
    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }
    return {
      success: true,
      data: {
        id: user.id,
        nome: user.nome,
        avatar: user.avatar,
        dataCriacao: user.dataCriacao.toISOString(),
        quantidadeInteracoes: user.quantidadeInteracoes,
        aniversario: user.aniversario?.toISOString().slice(0, 10) ?? null,
        instagram: user.instagram,
        whatsapp: user.whatsapp,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
}
