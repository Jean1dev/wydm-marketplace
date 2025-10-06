import { useState } from 'react';

interface CommentFormProps {
  isAuthenticated: boolean;
  isCreating: boolean;
  onCreateComment: (descricao: string) => Promise<void>;
}

export default function CommentForm({ isAuthenticated, isCreating, onCreateComment }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setCommentError('Você precisa estar logado para comentar.');
      return;
    }

    if (!commentText.trim()) {
      setCommentError('Comentário não pode estar vazio.');
      return;
    }

    if (commentText.trim().length > 1000) {
      setCommentError('Comentário deve ter no máximo 1000 caracteres.');
      return;
    }

    setCommentError(null);

    try {
      await onCreateComment(commentText.trim());
      setCommentText('');
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Erro ao criar comentário');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Adicionar comentário
          </label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Digite seu comentário aqui..."
            rows={4}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-gray-100 resize-none"
            disabled={isCreating}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {commentText.length}/1000 caracteres
            </span>
            {commentError && (
              <span className="text-xs text-red-600 dark:text-red-400">
                {commentError}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isCreating || !commentText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Comentando...</span>
              </>
            ) : (
              <>
                <span>💬</span>
                <span>Comentar</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
