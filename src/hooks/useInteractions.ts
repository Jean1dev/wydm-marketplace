import { useState, useEffect } from 'react';
import { InteractionData, CreateInteractionResponse } from '@/lib/useCases/post';

interface UseInteractionsResult {
  interactions: InteractionData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createInteraction: (descricao: string) => Promise<CreateInteractionResponse>;
  isCreating: boolean;
}

export const useInteractions = (postId: number): UseInteractionsResult => {
  const [interactions, setInteractions] = useState<InteractionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posts/${postId}/interactions`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar comentários');
      }

      setInteractions(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setInteractions([]);
    } finally {
      setLoading(false);
    }
  };

  const createInteraction = async (descricao: string): Promise<CreateInteractionResponse> => {
    setIsCreating(true);
    try {
      const response = await fetch(`/api/posts/${postId}/interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar comentário');
      }

      if (data.success && data.data) {
        setInteractions(prev => [data.data, ...prev]);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchInteractions();
    }
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    interactions,
    loading,
    error,
    refetch: fetchInteractions,
    createInteraction,
    isCreating,
  };
};
