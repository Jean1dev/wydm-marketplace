"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAllCategories, getCategoryById } from '@/lib/categories';
import { usePosts } from '@/hooks/usePosts';

export default function Forum() {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const categories = getAllCategories();
  const { posts, loading, error, refetch } = usePosts(selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              💬 Forum
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Participe das discussões da comunidade crypto
            </p>
          </div>
          <Link href="/">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              ← Voltar
            </button>
          </Link>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Categorias
              </h3>
              <div className="space-y-2">
                <label
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700 p-2 rounded-md transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-lg">📋</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Todas
                  </span>
                </label>
                
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700 p-2 rounded-md transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-lg">{category.emoji}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {category.titulo}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Posts {selectedCategory !== 'all' && `- ${getCategoryById(selectedCategory)?.titulo}`}
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <Link href="/forum/new">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    + Criar Novo Post
                  </button>
                </Link>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Erro ao carregar posts
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {error}
                </p>
                <button
                  onClick={refetch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
                    <Link href={`/forum/${post.id}`} className="block p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {post.categoryEmoji || '📝'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {post.categoryTitulo || 'Sem categoria'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.dataCriacao)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.titulo}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.descricaoTruncada || post.descricao}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        {post.autorAvatar ? (
                          <img
                            src={post.autorAvatar}
                            alt={post.autorNome}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                              {post.autorNome.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span>Por: {post.autorNome}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>Última atualização: {formatDate(post.dataAtualizacao || post.dataCriacao)}</span>
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
                
                {posts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Nenhum post encontrado
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Não há posts nesta categoria ainda.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
