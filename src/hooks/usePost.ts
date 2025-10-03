import { useState, useEffect } from 'react';
import type { PostDetailData } from '@/lib/useCases/post';

interface UsePostResult {
  post: PostDetailData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePost = (postId: number): UsePostResult => {
  const [post, setPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar post');
      }

      setPost(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  };
};
