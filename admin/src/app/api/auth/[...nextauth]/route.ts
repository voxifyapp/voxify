import firebaseAdmin from '@/lib/firebaseAdmin';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { type: 'string' },
      },
      authorize: async (credentials, req): Promise<any> => {
        if (credentials && credentials.idToken) {
          const idToken = credentials.idToken;
          const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
          return { ...decoded };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV !== 'production',
});

export { handler as GET, handler as POST };
