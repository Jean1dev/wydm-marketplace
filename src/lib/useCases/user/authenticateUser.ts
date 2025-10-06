import { findUserByOAuthId, createUser } from '@/db/queries/usuarios';

export interface AuthenticateUserRequest {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface AuthenticateUserResponse {
    success: boolean;
    user?: {
        id: number;
        nome: string;
        emailProvedorExterno?: string;
    };
    isNewUser?: boolean;
    error?: string;
}

export async function authenticateUser(request: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    try {
        if (!request.id) {
            return {
                success: false,
                error: 'ID do usuário não fornecido'
            };
        }

        const existingUser = await findUserByOAuthId(request.id);

        if (existingUser) {
            return {
                success: true,
                user: {
                    id: existingUser.id,
                    nome: existingUser.nome,
                    emailProvedorExterno: existingUser.emailProvedorExterno || undefined
                },
                isNewUser: false
            };
        }

        const newUser = await createUser({
            idProvedorOAuth: request.id,
            nome: request.name || 'Usuário',
            avatar: request.image || undefined,
            emailProvedorExterno: request.email || undefined
        });

        return {
            success: true,
            user: {
                id: newUser.id,
                nome: newUser.nome,
                emailProvedorExterno: newUser.emailProvedorExterno || undefined
            },
            isNewUser: true
        };
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return {
            success: false,
            error: 'Erro interno do servidor'
        };
    }
}
