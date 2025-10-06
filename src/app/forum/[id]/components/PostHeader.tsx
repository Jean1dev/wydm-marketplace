
interface PostHeaderProps {
  postId: number;
  categoryEmoji?: string;
  categoryTitulo?: string;
  dataCriacao: string;
  dataAtualizacao?: string;
}

export default function PostHeader({ 
  postId, 
  categoryEmoji, 
  categoryTitulo, 
  dataCriacao, 
  dataAtualizacao 
}: PostHeaderProps) {
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
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">
          {categoryEmoji || '📝'}
        </span>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {categoryTitulo || 'Sem categoria'}
          </span>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Post #{postId}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Criado em
        </div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {formatDate(dataCriacao)}
        </div>
        {dataAtualizacao && (
          <>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Atualizado em
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatDate(dataAtualizacao)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
