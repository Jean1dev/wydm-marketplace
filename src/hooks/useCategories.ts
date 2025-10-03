import { useMemo } from 'react';
import { getAllCategories, getPublicCategories } from '@/lib/categories';
import { useAuth } from './useAuth';

export const useCategories = () => {
  const { session, isAuthenticated } = useAuth();

  const categories = useMemo(() => {
    if (!isAuthenticated) {
      return getPublicCategories();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((session?.user as any)?.role === 'admin') {
      return getAllCategories();
    }

    return getPublicCategories();
  }, [isAuthenticated, session?.user]);

  return {
    categories,
    isLoading: false,
  };
};
