import { InteractionData } from '@/lib/useCases/post';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

interface CommentsSectionProps {
  interactions: InteractionData[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isCreating: boolean;
  onCreateComment: (descricao: string) => Promise<void>;
}

export default function CommentsSection({ 
  interactions, 
  loading, 
  error, 
  isAuthenticated, 
  isCreating, 
  onCreateComment 
}: CommentsSectionProps) {
  if (!loading && interactions.length === 0) {
    return (
      <div className="mt-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
          <CommentForm 
            isAuthenticated={isAuthenticated}
            isCreating={isCreating}
            onCreateComment={onCreateComment}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
        <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
            <span>💬</span>
            <span>Comentários</span>
            {interactions.length > 0 && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded-full">
                {interactions.length}
              </span>
            )}
          </h3>
        </div>

        <CommentForm 
          isAuthenticated={isAuthenticated}
          isCreating={isCreating}
          onCreateComment={onCreateComment}
        />

        <div className="p-6">
          <CommentsList 
            interactions={interactions}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
