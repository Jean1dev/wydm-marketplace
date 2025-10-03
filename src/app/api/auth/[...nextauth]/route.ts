import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { authenticateUser, getUserByOAuthId, updateUserLastVisit } from '@/lib/useCases/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const result = await authenticateUser({
          id: user.id || '',
          name: user.name,
          email: user.email,
          image: user.image
        });

        if (!result.success) {
          console.error('❌ Erro na autenticação:', result.error);
          return false;
        }

        return true;
      } catch (error) {
        console.error('❌ Erro durante o login:', error);
        return false;
      }
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (token.sub) {
        await updateUserLastVisit({ oauthId: token.sub });
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST }; 