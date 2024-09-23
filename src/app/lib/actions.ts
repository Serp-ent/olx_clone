'use server';

import { AuthError } from "next-auth";
import { signIn } from "../auth";
import db from '@/app/lib/prisma';
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const perms = Object.fromEntries(formData.entries());
    await signIn('credentials', { ...perms, redirect: true, redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registerUser(
  // prevState: string | undefined,
  formData: FormData,
) {
  // TODO: add validation using zod

  // TODO: add type
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  await db.user.create({
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });


  redirect('/login');
}