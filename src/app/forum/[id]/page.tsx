"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePost } from '@/hooks/usePost';
import { useInteractions } from '@/hooks/useInteractions';
import { useAuth } from '@/hooks/useAuth';
import { usePostViews } from '@/hooks/usePostViews';
import PostDetailLoading from './components/PostDetailLoading';
import PostDetailError from './components/PostDetailError';
import PostNotFound from './components/PostNotFound';
import PostHeader from './components/PostHeader';
import PostContent from './components/PostContent';
import CommentsSection from './components/CommentsSection';

export default function PostDetail() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const { post, loading, error, refetch } = usePost(postId);
  const { interactions, loading: interactionsLoading, error: interactionsError, createInteraction, isCreating } = useInteractions(postId);
  const { isAuthenticated } = useAuth();
  const { incrementViews } = usePostViews();
  const hasIncrementedViews = useRef(false);

  useEffect(() => {
    if (post && postId && !hasIncrementedViews.current) {
      hasIncrementedViews.current = true;
      incrementViews(postId);
    }
  }, [post, postId]);

  useEffect(() => {
    if (post?.titulo) {
      document.title = post.titulo;
    }
  }, [post]);

  const handleCreateComment = async (descricao: string) => {
    const result = await createInteraction(descricao);
    
    if (!result.success) {
      throw new Error(result.error || 'Erro ao criar comentário');
    }
  };

  if (loading) {
    return <PostDetailLoading />;
  }

  if (error) {
    return <PostDetailError error={error} onRetry={refetch} />;
  }

  if (!post) {
    return <PostNotFound />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              📖 Detalhes do Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Visualizando post do fórum
            </p>
          </div>
          <Link href="/forum">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              ← Voltar ao Forum
            </button>
          </Link>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-gray-200 dark:border-neutral-700">
          <PostHeader
            postId={post.id}
            categoryEmoji={post.categoryEmoji || undefined}
            categoryTitulo={post.categoryTitulo || undefined}
            dataCriacao={post.dataCriacao}
            dataAtualizacao={post.dataAtualizacao || undefined}
          />
          
          <PostContent
            titulo={post.titulo}
            descricao={post.descricao}
            autorNome={post.autorNome}
            autorAvatar={post.autorAvatar || undefined}
            dataCriacao={post.dataCriacao}
            estaBloqueado={post.estaBloqueado}
          />
        </div>

        <CommentsSection
          interactions={interactions}
          loading={interactionsLoading}
          error={interactionsError}
          isAuthenticated={isAuthenticated}
          isCreating={isCreating}
          onCreateComment={handleCreateComment}
        />
      </div>
    </div>
  );
}
