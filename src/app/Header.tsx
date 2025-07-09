"use client";

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { session, isAuthenticated, isLoading, signIn, signOut } = useAuth();
  const router = useRouter();

  const handleAnunciarClick = () => {
    router.push('/anunciar');
  };

  return (
    <header className="w-full border-b border-gray-100 dark:border-neutral-800 py-4 px-4 flex items-center justify-between bg-white dark:bg-neutral-900">
      <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">WYDM</span>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Barra de pesquisa - oculta em mobile muito pequeno */}
        <div className="relative hidden sm:block">
          <input type="text" placeholder="Search for products..." className="rounded-md border border-gray-200 dark:border-neutral-700 px-3 py-2 text-sm w-32 sm:w-48 focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-neutral-900" />
          <svg className="absolute right-2 top-2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>

        {/* Botão Anunciar - responsivo */}
        <button 
          onClick={handleAnunciarClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
        >
          <span className="hidden sm:inline">Anunciar produtos</span>
          <span className="sm:hidden">+ Anunciar</span>
        </button>

        {/* Ícones - sempre visíveis */}
        <button className="text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white p-1">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-13z"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg>
        </button>

        {/* Botão de autenticação */}
        {isLoading ? (
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <button
              onClick={() => signOut()}
              className="text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white text-sm"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white p-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
          </button>
        )}
      </div>
    </header>
  );
} 