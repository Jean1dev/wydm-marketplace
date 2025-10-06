import { useState, useCallback } from 'react';

interface UsePostViewsResult {
  incrementViews: (postId: number) => Promise<boolean>;
  isIncrementing: boolean;
  error: string | null;
}

export const usePostViews = (): UsePostViewsResult => {
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incrementViews = useCallback(async (postId: number): Promise<boolean> => {
    if (isIncrementing) {
      return false;
    }

    try {
      setIsIncrementing(true);
      setError(null);

      const response = await fetch(`/api/posts/${postId}/views`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao incrementar views');
      }

      return data.success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao incrementar views:', err);
      return false;
    } finally {
      setIsIncrementing(false);
    }
  }, [isIncrementing]);

  return {
    incrementViews,
    isIncrementing,
    error,
  };
};
