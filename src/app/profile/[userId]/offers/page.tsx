import { auth } from '@/app/auth';
import ItemsList from '@/app/components/itemList';
import db from '@/app/lib/prisma';
import { notFound } from 'next/navigation';

export default async function OffersOfUser({ params }: {
  params: {
    userId: string,
  }
}) {
  const user = await db.user.findUnique({
    where: { id: params.userId },
    include: {
      products: {
        include: {
          images: true,
        }
      },
    }
  });

  if (!user) {
    // TODO: add custom page 
    return notFound();
  }

  const session = await auth(); // Assuming you're getting session info
  const email = session?.user?.email; // Get the user ID from the session

  // Fetch user favorites if user is authenticated
  let favoriteItemIds = new Set<number>();
  if (email) {
    const userFavorites = await db.user.findUnique({
      where: { email },
      include: {
        favorites: true, // Assuming favorites are related items
      },
    });
    favoriteItemIds = new Set(userFavorites?.favorites.map(favorite => favorite.id));
  }

  // Check if each item is a favorite
  const itemsWithFavoriteFlag = user.products.map(item => ({
    ...item,
    isFavorite: favoriteItemIds.has(item.id),
  }));


  return (
    <main className="bg-white p-4">
      <ItemsList items={itemsWithFavoriteFlag} />
    </main>
  );
}