import { db } from '@/db';
import { posts } from '@/db/schema';
import { getCategoryById } from '@/lib/categories';
import { getAuthorByEmail } from '@/lib/useCases/user';

export interface CreatePostRequest {
  titulo: string;
  descricao: string;
  categoriaId: number;
  autorEmail: string;
}

export interface CreatePostResponse {
  success: boolean;
  error?: string;
}

const validateTitulo = (titulo: string): string | null => {
  if (!titulo || titulo.trim().length === 0) {
    return 'Título é obrigatório';
  }
  
  if (titulo.length > 255) {
    return 'Título deve ter no máximo 255 caracteres';
  }
  
  return null;
};

const validateDescricao = (descricao: string): string | null => {
  if (!descricao || descricao.trim().length === 0) {
    return 'Descrição é obrigatória';
  }
  
  return null;
};

const validateCategoria = (categoriaId: number): string | null => {
  if (!categoriaId || categoriaId <= 0) {
    return 'Categoria é obrigatória';
  }
  
  const category = getCategoryById(categoriaId);
  if (!category) {
    return 'Categoria inválida';
  }
  
  return null;
};

const createTruncatedDescription = (descricao: string): string => {
  const maxLength = 500;
  const truncateLength = 497;
  
  if (descricao.length > maxLength) {
    return descricao.substring(0, truncateLength) + '...';
  }
  
  return descricao;
};

const preparePostData = (request: CreatePostRequest, autorId: number, autorNome: string, autorAvatar: string | null) => {
  const { titulo, descricao, categoriaId } = request;
  
  return {
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    descricaoTruncada: createTruncatedDescription(descricao),
    dataCriacao: new Date(),
    estaBloqueado: false,
    estaVisivel: true,
    autorId,
    autorNome: autorNome.trim(),
    autorAvatar: autorAvatar,
    categoriaId,
  };
};

const insertPost = async (postData: ReturnType<typeof preparePostData>) => {
  return await db.insert(posts).values(postData);
};

const createSuccessResponse = (): CreatePostResponse => ({
  success: true
});

const createErrorResponse = (error: string): CreatePostResponse => ({
  success: false,
  error
});

export const createPost = async (request: CreatePostRequest): Promise<CreatePostResponse> => {
  try {
    const tituloError = validateTitulo(request.titulo);
    if (tituloError) return createErrorResponse(tituloError);

    const descricaoError = validateDescricao(request.descricao);
    if (descricaoError) return createErrorResponse(descricaoError);

    const categoriaError = validateCategoria(request.categoriaId);
    if (categoriaError) return createErrorResponse(categoriaError);

    const authorResult = await getAuthorByEmail(request.autorEmail);
    if (!authorResult.success) {
      return createErrorResponse(authorResult.error || 'Erro ao buscar autor');
    }

    const { id: autorId, nome: autorNome, avatar: autorAvatar } = authorResult.data!;
    const postData = preparePostData(request, autorId, autorNome, autorAvatar || null);
    await insertPost(postData);

    return createSuccessResponse();

  } catch (error) {
    console.error('Erro ao criar post:', error);
    return createErrorResponse('Erro interno do servidor');
  }
};
