import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getPosts, createPost } from '@/lib/useCases/post';

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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuário não autenticado'
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { titulo, descricao, categoriaId } = body;

    const result = await createPost({
      titulo,
      descricao,
      categoriaId: parseInt(categoriaId),
      autorEmail: session?.user?.email || '',
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('Erro na API de criação de posts:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}
