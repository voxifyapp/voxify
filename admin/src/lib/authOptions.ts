import firebaseAdmin from '@/lib/firebaseAdmin';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { type: 'string' },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.idToken) {
          const idToken = credentials.idToken;
          const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
          return {
            id: decoded.uid,
            email: decoded.email,
            // As a quick way to pass firebase idtoken into the jwt callback
            name: idToken,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async user => {
      return true;
    },
    jwt: ({ token, user }) => {
      token.firebaseIdToken = user.name;
      user.name = '';
      return { ...token, name: '' };
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV !== 'production',
};
