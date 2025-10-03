import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/lib/useCases/post';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID do post inválido'
        },
        { status: 400 }
      );
    }

    const result = await getPostById({ id: postId });

    if (!result.success) {
      const statusCode = result.error === 'Post não encontrado' ? 404 : 400;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erro na API de busca de post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}
