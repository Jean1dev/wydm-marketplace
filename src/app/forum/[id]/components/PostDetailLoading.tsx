export default function PostDetailLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
