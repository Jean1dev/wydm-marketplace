import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getInteractionsByPostId, createInteraction } from '@/lib/useCases/post';

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

        const result = await getInteractionsByPostId({ postId });

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('Erro na API de busca de interações:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email do usuário não encontrado'
                },
                { status: 400 }
            );
        }

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

        const body = await request.json();
        const { descricao } = body;

        const result = await createInteraction({
            descricao,
            autorEmail: session.user.email,
            postId,
        });

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result, { status: 201 });

     } catch {
         return NextResponse.json(
             {
                 success: false,
                 error: 'Erro interno do servidor'
             },
             { status: 500 }
         );
     }
}
