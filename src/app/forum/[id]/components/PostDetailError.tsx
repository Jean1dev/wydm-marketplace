import Link from 'next/link';

interface PostDetailErrorProps {
  error: string;
  onRetry: () => void;
}

export default function PostDetailError({ error, onRetry }: PostDetailErrorProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Erro ao carregar post
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <div className="space-x-4">
            <button
              onClick={onRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Tentar novamente
            </button>
            <Link href="/forum">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Voltar ao Forum
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
