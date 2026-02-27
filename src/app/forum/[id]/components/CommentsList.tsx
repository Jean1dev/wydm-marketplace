import Link from 'next/link';
import { InteractionData } from '@/lib/useCases/post';

interface CommentsListProps {
  interactions: InteractionData[];
  loading: boolean;
  error: string | null;
}

export default function CommentsList({ interactions, loading, error }: CommentsListProps) {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Carregando comentários...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-gray-600 dark:text-gray-400">
          Erro ao carregar comentários: {error}
        </p>
      </div>
    );
  }

  if (interactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">💭</div>
        <p className="text-gray-600 dark:text-gray-400">
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {interactions.map((interaction) => (
        <div key={interaction.id} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4 py-2">
          <div className="flex items-start space-x-3">
            <Link
              href={`/perfil/${interaction.autorId}`}
              className="flex-shrink-0 hover:opacity-90 transition-opacity"
            >
              {interaction.autorAvatar ? (
                <img
                  src={interaction.autorAvatar}
                  alt={interaction.autorNome}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-blue-400/50 transition-shadow"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ring-2 ring-transparent hover:ring-blue-400/50 transition-shadow">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {interaction.autorNome.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Link
                  href={`/perfil/${interaction.autorId}`}
                  className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {interaction.autorNome}
                </Link>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(interaction.dataCriacao)}
                </span>
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {interaction.descricao}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
