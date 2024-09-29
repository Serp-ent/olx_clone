import { auth } from '@/app/auth';
import ItemsList from '@/app/components/itemList';
import db from '@/app/lib/prisma'
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: {
  params: {
    categoryId: string,
  }
}) {
  const id = parseInt(params.categoryId) || -1;
  const category = await db.category.findUnique({ where: { id } });
  if (!category) {
    return notFound();
  }

  // TODO: add pagination
  // TODO: add custom page if there is no items for given category

  // filter items for given category
  const session = await auth(); // Assuming you're getting session info
  const email = session?.user?.email; // Get the user ID from the session

  const items = await db.item.findMany({
    where: {
      categoryId: parseInt(params.categoryId),
    },
    include: {
      images: true,
    }
  });

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
  const itemsWithFavoriteFlag = items.map(item => ({
    ...item,
    isFavorite: favoriteItemIds.has(item.id),
  }));

  return (
    <main className='p-4'>
      <h1 className='font-bold text-2xl pb-2'>
        {category.name}
      </h1>
      <ItemsList items={itemsWithFavoriteFlag} />
    </main>

  );
}