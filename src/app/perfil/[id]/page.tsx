"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useUsuario } from '@/hooks/useUsuario';

export default function PerfilPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const { usuario, loading, error, refetch } = useUsuario(isNaN(id) ? null : id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatAniversario = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !usuario) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Perfil não encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'Este usuário não existe ou foi removido.'}
          </p>
          <Link
            href="/forum"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Voltar ao Fórum
          </Link>
          {error && (
            <button
              onClick={refetch}
              className="ml-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    );
  }

  const whatsappLink = usuario.whatsapp
    ? `https://wa.me/55${usuario.whatsapp.replace(/\D/g, '')}`
    : null;
  const instagramLink = usuario.instagram
    ? usuario.instagram.startsWith('http')
      ? usuario.instagram
      : `https://instagram.com/${usuario.instagram.replace(/^@/, '')}`
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Perfil do usuário
          </h1>
          <Link
            href="/forum"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            ← Voltar ao Fórum
          </Link>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden shadow-sm">
          <div className="h-24 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-600/30 dark:to-indigo-600/30" />
          <div className="px-6 pb-6 -mt-12 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {usuario.avatar ? (
                <img
                  src={usuario.avatar}
                  alt={usuario.nome}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-neutral-800 flex-shrink-0 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center border-4 border-white dark:border-neutral-800 flex-shrink-0 shadow-md">
                  <span className="text-3xl font-semibold text-gray-600 dark:text-gray-300">
                    {usuario.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  {usuario.nome}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Membro desde {formatDate(usuario.dataCriacao)}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-neutral-700/50">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Interações no fórum
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {usuario.quantidadeInteracoes}
                  </p>
                </div>
              </div>
              {usuario.aniversario && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-neutral-700/50">
                  <span className="text-2xl">🎂</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Aniversário
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {formatAniversario(usuario.aniversario)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.08zm0 5.04a3.84 3.84 0 100 7.68 3.84 3.84 0 000-7.68zm0 10.16a6.32 6.32 0 100-12.64 6.32 6.32 0 000 12.64z" clipRule="evenodd" />
                  </svg>
                  Instagram
                </a>
              )}
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
            {!instagramLink && !whatsappLink && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Este usuário não informou redes sociais.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
