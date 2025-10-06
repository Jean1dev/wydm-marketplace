"use client";

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { session, isAuthenticated, isLoading, signIn, signOut } = useAuth();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="w-full border-b border-gray-100 dark:border-neutral-800 py-4 px-4 flex items-center justify-between bg-white dark:bg-neutral-900">
      <span 
        onClick={handleLogoClick}
        className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Comunidade Crypto
      </span>
      
      <div className="flex items-center gap-2 sm:gap-4">

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