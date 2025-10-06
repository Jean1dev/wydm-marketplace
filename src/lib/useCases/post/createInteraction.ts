import { db } from '@/db';
import { interacoes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getAuthorByEmail, updateUserInteractions } from '@/lib/useCases/user';
import { updatePostDate } from './updatePostDate';

export interface CreateInteractionRequest {
  descricao: string;
  autorEmail: string;
  postId: number;
}

export interface CreateInteractionResponse {
  success: boolean;
  data?: {
    id: number;
    descricao: string;
    autorId: number;
    autorNome: string;
    autorAvatar: string | null;
    postId: number;
    dataCriacao: string;
  };
  error?: string;
}

const validateDescricao = (descricao: string): string | null => {
  if (!descricao || descricao.trim().length === 0) {
    return 'Comentário é obrigatório';
  }
  if (descricao.trim().length > 1000) {
    return 'Comentário deve ter no máximo 1000 caracteres';
  }
  return null;
};

const validatePostId = (postId: number): string | null => {
  if (!postId || postId <= 0) {
    return 'ID do post é obrigatório';
  }
  return null;
};

const prepareInteractionData = (request: CreateInteractionRequest, autorId: number, autorNome: string, autorAvatar: string | null) => {
  const { descricao, postId } = request;
  return {
    descricao: descricao.trim(),
    autorId,
    autorNome: autorNome.trim(),
    autorAvatar: autorAvatar,
    postId,
    dataCriacao: new Date(),
  };
};

const insertInteraction = async (interactionData: ReturnType<typeof prepareInteractionData>) => {
  const [result] = await db.insert(interacoes).values(interactionData);
  return result;
};

const getCreatedInteraction = async (insertId: number) => {
  const [interaction] = await db
    .select()
    .from(interacoes)
    .where(eq(interacoes.id, insertId))
    .limit(1);

  return interaction;
};

const formatInteractionData = (interaction: Awaited<ReturnType<typeof getCreatedInteraction>>) => {
  if (!interaction) return null;
  
  return {
    id: interaction.id,
    descricao: interaction.descricao,
    autorId: interaction.autorId,
    autorNome: interaction.autorNome,
    autorAvatar: interaction.autorAvatar,
    postId: interaction.postId,
    dataCriacao: interaction.dataCriacao.toISOString(),
  };
};

const createSuccessResponse = (data: NonNullable<ReturnType<typeof formatInteractionData>>): CreateInteractionResponse => ({
  success: true,
  data
});

const createErrorResponse = (error: string): CreateInteractionResponse => ({
  success: false,
  error
});

export const createInteraction = async (request: CreateInteractionRequest): Promise<CreateInteractionResponse> => {
  try {
    const descricaoError = validateDescricao(request.descricao);
    if (descricaoError) return createErrorResponse(descricaoError);

    const postIdError = validatePostId(request.postId);
    if (postIdError) return createErrorResponse(postIdError);

    const authorResult = await getAuthorByEmail(request.autorEmail);
    if (!authorResult.success) {
      return createErrorResponse(authorResult.error || 'Erro ao buscar autor');
    }

    const { id: autorId, nome: autorNome, avatar: autorAvatar } = authorResult.data!;
    const interactionData = prepareInteractionData(request, autorId, autorNome, autorAvatar || null);
    const insertResult = await insertInteraction(interactionData);
    
    const createdInteraction = await getCreatedInteraction(insertResult.insertId);
    const formattedData = formatInteractionData(createdInteraction);
    
    if (!formattedData) {
      return createErrorResponse('Erro ao recuperar comentário criado');
    }

    const updateResult = await updatePostDate({ postId: request.postId });
    if (!updateResult.success) {
      console.warn('Erro ao atualizar data do post:', updateResult.error);
    }

    const userUpdateResult = await updateUserInteractions({ userId: autorId });
    if (!userUpdateResult.success) {
      console.warn('Erro ao atualizar interações do usuário:', userUpdateResult.error);
    }

    return createSuccessResponse(formattedData);

  } catch (error) {
    console.error('Erro ao criar interação:', error);
    return createErrorResponse('Erro interno do servidor');
  }
};
