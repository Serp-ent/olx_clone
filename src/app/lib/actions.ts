'use server';


import fs from 'fs';
import path from 'path';
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
    redirect('/login');
  }

  const user = await db.user.findUnique({
    where: { email: session?.user?.email },
    include: { favorites: true }
  });

  if (!user) {
    redirect('/login');
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
  // TODO: fix registration
  // missing fields firstName and lastName
  await db.user.create({
    data: {
      email: credentials.email,
      password: credentials.password, // You might want to hash the password before saving
    },
  });

  console.log('redirecting');
  redirect('/login'); // Redirect after successful registration
}

// TODO: validation schemas should be in distinct files
// TODO: stricter validation
const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export async function updateProfile(formData: FormData) {
  const userAuth = (await auth())!.user;
  if (!userAuth) {
    return "Unauthorized";
  }

  const data = {
    firstName: formData.get("firstName")?.toString(),
    lastName: formData.get("lastName")?.toString(),
    phoneNumber: formData.get("phoneNumber")?.toString(),
    street: formData.get("street")?.toString(),
    city: formData.get("city")?.toString(),
    state: formData.get("state")?.toString(),
    postalCode: formData.get("postalCode")?.toString(),
    country: formData.get("country")?.toString(),
  };

  const validation = updateProfileSchema.safeParse(data);
  if (!validation.success) {
    console.error("Validation failed:", validation.error.format());
    return "Validation error";
  }



  try {
    // Update user profile in database
    const profilePicture = formData.get('profilePic') as File || null;
    let profilePictureUrl: string | null = null;
    if (profilePicture && profilePicture.size !== 0) {
      //**** */
      const buffer = await profilePicture.arrayBuffer();
      const photoBuffer = Buffer.from(buffer);

      const destinationPath = path.join(
        process.cwd(),
        'public',
        'user',
        userAuth.email!.toString(),
      );

      // Ensure the directory exists
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }

      const filePath = path.join(destinationPath, profilePicture.name);
      fs.writeFileSync(filePath, photoBuffer);

      // TODO: this should use id instead of email
      profilePictureUrl = `/user/${userAuth.email!}/${profilePicture.name}`;
    }

    console.log('profilePictureUrl:', profilePictureUrl)

    await db.user.update({
      where: { email: userAuth.email! },
      data: {
        firstName: validation.data.firstName,
        lastName: validation.data.lastName,
        phoneNumber: validation.data.phoneNumber,
        address: {
          upsert: {
            create: {
              street: validation.data.street,
              city: validation.data.city,
              state: validation.data.state,
              postalCode: validation.data.postalCode,
              country: validation.data.country,
            },
            update: {
              street: validation.data.street,
              city: validation.data.city,
              state: validation.data.state,
              postalCode: validation.data.postalCode,
              country: validation.data.country,
            },
          },
        },
        ...(profilePictureUrl && { profilePictureUrl })
      },
    });

    revalidatePath('/profile');
  } catch (error) {
    console.error("Error updating profile:", error);
    return "Error updating profile";
  }

  redirect('/profile');
}

export async function createAd(formData: FormData) {
  'use server';

  const form = {
    name: formData.get('name')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    price: formData.get('price')?.toString() || '',
    categoryId: formData.get('category')?.toString() || '',
  };

  const price = parseFloat(form.price);
  const categoryId = parseInt(form.categoryId, 10);
  const photoFiles = formData.getAll('photos') as File[];  // Get all photos as an array of Files

  if (!form.name || isNaN(price) || isNaN(categoryId) || photoFiles.length === 0) {
    throw new Error('Invalid form data');
  }

  const email = (await auth())!.user!.email!;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Cannot find user for current session');
  }

  const newProduct = await db.item.create({
    data: {
      name: form.name,
      description: form.description,
      price, // storing price as a number
      categoryId, // storing categoryId as a number
      authorId: user.id,
    },
  });

  // Process each uploaded photo
  for (const photoFile of photoFiles) {
    const buffer = await photoFile.arrayBuffer();
    const photoBuffer = Buffer.from(buffer);

    const destinationPath = path.join(
      process.cwd(),
      'public',
      'items',
      newProduct.id.toString()
    );

    // Ensure the directory exists
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    const filePath = path.join(destinationPath, photoFile.name);
    fs.writeFileSync(filePath, photoBuffer);

    const imageUrl = `/items/${newProduct.id}/${photoFile.name}`;
    await db.productImage.create({
      data: {
        url: imageUrl,
        productId: newProduct.id,
      },
    });
  }

  revalidatePath('/');
  redirect('/');
}

// TODO: add validation if the user is owner 
// TODO: check if item exists
export async function deleteOffer(offerId: number, redirectLink: string | null) {
  await db.productImage.deleteMany({
    where: {
      productId: offerId
    }
  });

  await db.item.delete({
    where: { id: offerId },
  });

  revalidatePath('/myOffers');
  if (redirectLink) {
    redirect(redirectLink);
  }
}