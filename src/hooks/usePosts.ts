import { useState, useEffect } from 'react';

export interface Post {
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

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addPost: (post: Post) => void;
}

export const usePosts = (categoryId?: number | 'all'): UsePostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (categoryId && categoryId !== 'all') {
        params.append('categoryId', categoryId.toString());
      }
      params.append('limit', '10');

      const response = await fetch(`/api/posts?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar posts');
      }

      setPosts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    addPost,
  };
};
