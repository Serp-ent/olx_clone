import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import { User } from '@prisma/client';

// TODO: there should be only one prisma client for whole application
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? user : undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;
        const user = await getUser(email);
        if (!user) return null;

        const passwordMatch = password === user.password;
        if (passwordMatch) {
          return user;
        }

        return null;
      },
    })
  ]
});