import { useState, useEffect } from 'react';
import type { PerfilPublicoData } from '@/lib/useCases/user';

interface UseUsuarioResult {
  usuario: PerfilPublicoData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUsuario(userId: number | null): UseUsuarioResult {
  const [usuario, setUsuario] = useState<PerfilPublicoData | null>(null);
  const [loading, setLoading] = useState(!!userId);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuario = async () => {
    if (!userId) {
      setUsuario(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/usuarios/${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar perfil');
      }
      setUsuario(data.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, [userId]);

  return {
    usuario,
    loading,
    error,
    refetch: fetchUsuario,
  };
}
