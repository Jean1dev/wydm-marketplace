import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface UpdatePostDateRequest {
  postId: number;
}

export interface UpdatePostDateResponse {
  success: boolean;
  error?: string;
}

const validatePostId = (postId: number): string | null => {
  if (!postId || postId <= 0) {
    return 'ID do post é obrigatório';
  }
  return null;
};

const updatePostDateInDb = async (postId: number) => {
  const result = await db
    .update(posts)
    .set({ 
      dataAtualizacao: new Date() 
    })
    .where(eq(posts.id, postId));

  return result;
};

const createSuccessResponse = (): UpdatePostDateResponse => ({
  success: true
});

const createErrorResponse = (error: string): UpdatePostDateResponse => ({
  success: false,
  error
});

export const updatePostDate = async (request: UpdatePostDateRequest): Promise<UpdatePostDateResponse> => {
  try {
    const { postId } = request;

    const postIdError = validatePostId(postId);
    if (postIdError) return createErrorResponse(postIdError);

    await updatePostDateInDb(postId);

    return createSuccessResponse();

  } catch (error) {
    console.error('Erro ao atualizar data do post:', error);
    return createErrorResponse('Erro interno do servidor');
  }
};
