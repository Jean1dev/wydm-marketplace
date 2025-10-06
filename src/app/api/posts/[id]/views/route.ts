import { NextRequest, NextResponse } from 'next/server';
import { incrementPostViews } from '@/lib/useCases/post';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const postId = parseInt(params.id);

    if (isNaN(postId) || postId <= 0) {
      return NextResponse.json(
        { error: 'ID do post inválido' },
        { status: 400 }
      );
    }

    await incrementPostViews({ postId });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error('Erro na API de views:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
