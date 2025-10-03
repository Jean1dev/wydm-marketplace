import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/useCases/post';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryIdParam = searchParams.get('categoryId');
    const limit = parseInt(searchParams.get('limit') || '10');

    const categoryId = categoryIdParam && categoryIdParam !== 'all' 
      ? parseInt(categoryIdParam) 
      : undefined;

    const result = await getPosts({
      categoryId,
      limit
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erro na API de posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}
