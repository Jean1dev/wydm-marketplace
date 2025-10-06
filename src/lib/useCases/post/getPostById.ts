import { db } from '@/db';
import { posts, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface GetPostByIdRequest {
  id: number;
}

export interface PostDetailData {
  id: number;
  titulo: string;
  descricao: string;
  descricaoTruncada: string | null;
  dataCriacao: string;
  dataAtualizacao: string | null;
  estaBloqueado: boolean;
  estaVisivel: boolean;
  autorId: number;
  autorNome: string;
  autorAvatar: string | null;
  categoriaId: number;
  categoryTitulo: string | null;
  categoryEmoji: string | null;
}

export interface GetPostByIdResponse {
  success: boolean;
  data?: PostDetailData;
  error?: string;
}

const validatePostId = (id: number): string | null => {
  if (!id || id <= 0) {
    return 'ID do post é obrigatório';
  }
  
  return null;
};

const findPostById = async (id: number) => {
  const result = await db
    .select({
      id: posts.id,
      titulo: posts.titulo,
      descricao: posts.descricao,
      descricaoTruncada: posts.descricaoTruncada,
      dataCriacao: posts.dataCriacao,
      dataAtualizacao: posts.dataAtualizacao,
      estaBloqueado: posts.estaBloqueado,
      estaVisivel: posts.estaVisivel,
      autorId: posts.autorId,
      autorNome: posts.autorNome,
      autorAvatar: posts.autorAvatar,
      categoriaId: posts.categoriaId,
      categoryTitulo: categories.titulo,
      categoryEmoji: categories.emoji,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoriaId, categories.id))
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] || null;
};

const formatPostData = (post: NonNullable<Awaited<ReturnType<typeof findPostById>>>): PostDetailData => {
  return {
    id: post.id,
    titulo: post.titulo,
    descricao: post.descricao,
    descricaoTruncada: post.descricaoTruncada,
    dataCriacao: post.dataCriacao.toISOString(),
    dataAtualizacao: post.dataAtualizacao?.toISOString() || null,
    estaBloqueado: post.estaBloqueado,
    estaVisivel: post.estaVisivel,
    autorId: post.autorId,
    autorNome: post.autorNome,
    autorAvatar: post.autorAvatar,
    categoriaId: post.categoriaId,
    categoryTitulo: post.categoryTitulo,
    categoryEmoji: post.categoryEmoji,
  };
};

const createErrorResponse = (error: string): GetPostByIdResponse => ({
  success: false,
  error
});

const createSuccessResponse = (data: PostDetailData): GetPostByIdResponse => ({
  success: true,
  data
});

export const getPostById = async (request: GetPostByIdRequest): Promise<GetPostByIdResponse> => {
  try {
    const { id } = request;

    const idError = validatePostId(id);
    if (idError) return createErrorResponse(idError);

    const post = await findPostById(id);
    
    if (!post) {
      return createErrorResponse('Post não encontrado');
    }

    if (!post.estaVisivel) {
      return createErrorResponse('Post não está visível');
    }

    const formattedPost = formatPostData(post);
    return createSuccessResponse(formattedPost);

  } catch (error) {
    console.error('Erro ao buscar post por ID:', error);
    return createErrorResponse('Erro interno do servidor');
  }
};
