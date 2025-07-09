"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

type Product = {
  id: number;
  name: string;
  category: string;
  amount: string;
  quantity: number;
  sellerName: string;
  sellerReputation: number;
  sellerFk: number;
  createdAt: string;
  updatedAt: string;
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex items-center gap-0.5">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
          </svg>
        ))}
      {halfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" fill="url(#half)"/>
        </svg>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
          </svg>
        ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Produto não encontrado');
          }
          throw new Error('Erro ao carregar produto');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para comprar produtos');
      return;
    }
    
    // Aqui você pode implementar a lógica de compra
    alert('Funcionalidade de compra será implementada em breve!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
          <div className="text-center text-red-600 dark:text-red-400">
            <h2 className="text-xl font-semibold mb-2">Erro</h2>
            <p>{error}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Voltar
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <h2 className="text-xl font-semibold mb-2">Produto não encontrado</h2>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Voltar
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagem do Produto */}
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-8 flex items-center justify-center">
            <Image
              src="/images/dimas.png"
              alt={product.name}
              width={400}
              height={400}
              className="object-contain max-h-80"
            />
          </div>

          {/* Detalhes do Produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Categoria: {product.category}
              </p>
            </div>

            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              R$ {product.amount}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StarRating rating={product.sellerReputation} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Vendedor: {product.sellerName}
                </span>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Quantidade disponível: {product.quantity} unidades</p>
                <p>Anunciado em: {new Date(product.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <button
                onClick={handleBuyClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
              >
                Comprar Agora
              </button>
              
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-md font-medium transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 