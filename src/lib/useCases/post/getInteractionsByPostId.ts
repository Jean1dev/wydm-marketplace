import { db } from '@/db';
import { interacoes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export interface GetInteractionsByPostIdRequest {
  postId: number;
}

export interface InteractionData {
  id: number;
  descricao: string;
  autorId: number;
  autorNome: string;
  autorAvatar: string | null;
  postId: number;
  dataCriacao: string;
}

export interface GetInteractionsByPostIdResponse {
  success: boolean;
  data?: InteractionData[];
  error?: string;
}

const validatePostId = (postId: number): string | null => {
  if (!postId || postId <= 0) {
    return 'ID do post é obrigatório';
  }
  
  return null;
};

const findInteractionsByPostId = async (postId: number) => {
  const result = await db
    .select({
      id: interacoes.id,
      descricao: interacoes.descricao,
      autorId: interacoes.autorId,
      autorNome: interacoes.autorNome,
      autorAvatar: interacoes.autorAvatar,
      postId: interacoes.postId,
      dataCriacao: interacoes.dataCriacao,
    })
    .from(interacoes)
    .where(eq(interacoes.postId, postId))
    .orderBy(desc(interacoes.dataCriacao));

  return result;
};

const formatInteractionsData = (interactions: Awaited<ReturnType<typeof findInteractionsByPostId>>): InteractionData[] => {
  return interactions.map(interaction => ({
    id: interaction.id,
    descricao: interaction.descricao,
    autorId: interaction.autorId,
    autorNome: interaction.autorNome,
    autorAvatar: interaction.autorAvatar,
    postId: interaction.postId,
    dataCriacao: interaction.dataCriacao.toISOString(),
  }));
};

const createErrorResponse = (error: string): GetInteractionsByPostIdResponse => ({
  success: false,
  error
});

const createSuccessResponse = (data: InteractionData[]): GetInteractionsByPostIdResponse => ({
  success: true,
  data
});

export const getInteractionsByPostId = async (request: GetInteractionsByPostIdRequest): Promise<GetInteractionsByPostIdResponse> => {
  try {
    const { postId } = request;

    const postIdError = validatePostId(postId);
    if (postIdError) return createErrorResponse(postIdError);

    const interactions = await findInteractionsByPostId(postId);
    const formattedInteractions = formatInteractionsData(interactions);

    return createSuccessResponse(formattedInteractions);

  } catch (error) {
    console.error('Erro ao buscar interações por post ID:', error);
    return createErrorResponse('Erro interno do servidor');
  }
};
