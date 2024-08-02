import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { db } from './db';

const GOOGLE_ID = process.env.AUTH_GOOGLE_ID;
const GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET;

if (!GOOGLE_ID || !GOOGLE_SECRET) {
  throw new Error('Missing GOOGLE_ID and GOOGLE_SECRET environment variables');
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
});
