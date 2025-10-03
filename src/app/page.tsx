"use client";

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

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
          
          <div className="flex justify-center">
            <Link href="/forum">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 cursor-pointer max-w-md">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Forum
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Participe das discussões da comunidade crypto. Compartilhe estratégias, 
                  arbitragens, sugestões e muito mais.
                </p>
              </div>
            </Link>
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
              <Link href="/forum">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Acessar Forum
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
