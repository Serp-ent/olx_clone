import db from '@/app/lib/prisma';
import Card from './card';
import { auth } from './auth';

export default async function ItemsGrid() {
  const session = await auth();
  const email = session?.user!.email;

  // Fetch items and user favorites in parallel
  const [items, userFavorites] = await Promise.all([
    db.item.findMany({
      include: {
        images: true,
      },
    }),
    db.user.findUnique({
      where: { email: email || '' },
      include: {
        favorites: true,
      },
    }),
  ]);

  // Create a set of favorite item IDs for quick lookup
  const favoriteItemIds = new Set(userFavorites?.favorites.map((item) => item.id));

  // Add isFavorite flag to each item
  const itemsWithFavoriteFlag = items.map((item) => ({
    ...item,
    isFavorite: favoriteItemIds.has(item.id),
  }));

  return (
    <section className="p-4 grow">
      <h3
        className="font-bold text-xl pb-4">
        Chosen for you
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {itemsWithFavoriteFlag.map((item) => <Card
          key={item.id}
          item={item}
        />)}
      </div>
    </section>
  );
}