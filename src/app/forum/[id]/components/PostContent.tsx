import Link from 'next/link';

interface PostContentProps {
  titulo: string;
  descricao: string;
  autorId: number;
  autorNome: string;
  autorAvatar?: string;
  dataCriacao: string;
  estaBloqueado: boolean;
}

export default function PostContent({ 
  titulo, 
  descricao, 
  autorId,
  autorNome, 
  autorAvatar, 
  dataCriacao, 
  estaBloqueado 
}: PostContentProps) {
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
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {titulo}
      </h2>
      
      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {descricao}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
        <div className="flex items-center justify-between">
          <Link
            href={`/perfil/${autorId}`}
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            {autorAvatar ? (
              <img
                src={autorAvatar}
                alt={autorNome}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent hover:ring-blue-400/50 transition-shadow"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ring-2 ring-transparent hover:ring-blue-400/50 transition-shadow">
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  {autorNome.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {autorNome}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Autor do post
              </div>
            </div>
          </Link>
          
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1 mb-1">
              <span>📅</span>
              <span>Criado em {formatDate(dataCriacao)}</span>
            </div>
            {estaBloqueado && (
              <div className="flex items-center space-x-1 text-red-500">
                <span>🔒</span>
                <span>Post bloqueado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
