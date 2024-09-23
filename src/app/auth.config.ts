import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  debug: true,
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;