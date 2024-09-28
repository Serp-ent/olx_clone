import db from '@/app/lib/prisma'
import Item from './item';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import EmptyList from './emptyList';
import { auth } from '../auth';

export default async function ItemsList(
  { query, categoryId, authorId }
    : { query?: string, categoryId?: number, authorId?: string }
) {
  
  // TODO: this component should only display not filter -> too many options
  const session = await auth(); // Assuming you're getting session info
  const email = session?.user?.email; // Get the user ID from the session

  const items = await db.item.findMany({
    where: {
      ...(query && {
        name: {
          contains: query.toLowerCase(),
          mode: 'insensitive',
        },
      }),
      ...(categoryId && { categoryId }),
      ...(authorId && { authorId }),
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

  if (itemsWithFavoriteFlag.length === 0) {
    return <EmptyList />;
  }

  return (
    <ul className='p-2 space-y-1'>
      {itemsWithFavoriteFlag.map((item) => (
        <li key={item.id}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  );
}