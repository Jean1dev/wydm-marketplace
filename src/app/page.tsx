"use client";

import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            🚀 Comunidade Crypto
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Bem-vindo ao fórum da comunidade crypto! Aqui você pode discutir estratégias, 
            arbitragens, sugestões e muito mais sobre o mundo das criptomoedas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Release Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Acompanhe as últimas atualizações e novidades da plataforma.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Estratégias
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Compartilhe e discuta estratégias de investimento em crypto.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Arbitragens
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Identifique oportunidades de arbitragem entre exchanges.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Sugestões
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Proponha melhorias para a plataforma e comunidade.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Críticas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Analise e critique projetos e estratégias de forma construtiva.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
              <div className="text-3xl mb-3">💥</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Lasque o Pau
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Espaço para discussões mais diretas e controversas.
              </p>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Faça parte da comunidade!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Entre com sua conta Google para participar das discussões e criar posts.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Entrar com Google
              </button>
            </div>
          )}

          {isAuthenticated && (
            <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Bem-vindo à comunidade!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Você está logado e pode participar de todas as discussões.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Criar Primeiro Post
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
