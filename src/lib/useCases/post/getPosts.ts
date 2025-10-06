import { db } from '@/db';
import { posts, categories } from '@/db/schema';
import { desc, eq, and } from 'drizzle-orm';

export interface GetPostsRequest {
  categoryId?: number;
  limit?: number;
}

export interface PostData {
  id: number;
  titulo: string;
  descricao: string;
  descricaoTruncada: string | null;
  dataCriacao: Date;
  dataAtualizacao: Date | null;
  estaBloqueado: boolean;
  estaVisivel: boolean;
  autorId: number;
  autorNome: string;
  autorAvatar: string | null;
  categoriaId: number;
  categoryTitulo: string | null;
  categoryEmoji: string | null;
}

export interface GetPostsResponse {
  success: boolean;
  data?: PostData[];
  count?: number;
  error?: string;
}

export async function getPosts(request: GetPostsRequest = {}): Promise<GetPostsResponse> {
  try {
    const { categoryId, limit = 10 } = request;

    const whereConditions = [
      eq(posts.estaVisivel, true),
      eq(posts.estaBloqueado, false)
    ];

    if (categoryId) {
      whereConditions.push(eq(posts.categoriaId, categoryId));
    }

    const query = db
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
      .where(and(...whereConditions))
      .orderBy(desc(posts.dataAtualizacao))
      .limit(limit);

    const postsData = await query;

    return {
      success: true,
      data: postsData,
      count: postsData.length
    };

  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}
