import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Post não encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            O post que você está procurando não existe ou foi removido.
          </p>
          <Link href="/forum">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Voltar ao Forum
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
