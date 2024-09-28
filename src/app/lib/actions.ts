'use server';

import { AuthError } from "next-auth";
import { auth, signIn } from "../auth";
import db from '@/app/lib/prisma';
import { redirect } from "next/navigation";
import { z } from 'zod'
import { revalidatePath } from "next/cache";

export async function toggleFavorites(productIdStr: string) {
  const session = await auth();
  // TODO: refactor
  if (!session || !session.user || !session.user.email) {
    return;
  }

  const user = await db.user.findUnique({
    where: { email: session?.user?.email },
    include: { favorites: true }
  });

  if (!user) {
    return;
  }

  const productId = Number(productIdStr);
  const isFavorited = user.favorites.some((product) => product.id === productId);

  if (isFavorited) {
    // Remove from favorites
    console.log('removed from favorites item with id', productIdStr)
    await db.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          disconnect: { id: productId },
        },
      },
    });
  } else {
    // Add to favorites
    console.log('added to favorites item with id', productIdStr)
    await db.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          connect: { id: productId },
        },
      },
    });
  }

  revalidatePath('/observed');
  revalidatePath(`/offer/${productIdStr}`);

  return {
    itemId: parseInt(productIdStr),
    isFavorited: !isFavorited
  };
}

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

const registrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export async function registerUser(
  state: { error?: string; errors?: { email?: string[]; password?: string[]; confirmPassword?: string[] } },
  formData: FormData
) {
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const validatedFields = registrationSchema.safeParse(credentials);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUser = await db.user.findUnique({
    where: { email: credentials.email },
  });

  console.log('checking if user exists');
  if (existingUser) {
    return {
      errors: { email: 'User with this email already exists' },
    };
  }

  console.log('creating user');
  await db.user.create({
    data: {
      email: credentials.email,
      password: credentials.password, // You might want to hash the password before saving
    },
  });

  console.log('redirecting');
  redirect('/login'); // Redirect after successful registration
}
