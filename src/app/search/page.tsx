
// TODO: change title for the whole page
// TODO: add pagination 
// TODO: add sorting by newest, most hearted, oldest etc...
// TODO: add notFound if there is no items matching query

import { auth } from "../auth";
import ItemsList from "../components/itemList";
import Pagination from "../components/pagination";
import Search from "./search";
import db from '@/app/lib/prisma';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string,
    page?: string,
  }
}) {
  const query = searchParams?.q || '';

  const session = await auth(); // Assuming you're getting session info
  const email = session?.user?.email; // Get the user ID from the session


  const limit = 10;
  // TODO: fix that disgusting handling of strings
  const page = parseInt(searchParams?.page || '1') || 1;
  const step = (page - 1) * limit;

  const items = await db.item.findMany({
    where: {
      ...(query && {
        name: {
          contains: query.toLowerCase(),
          mode: 'insensitive',
        },
      }),
    },
    include: {
      images: true,
    },
    skip: step,
    take: limit,
  });


  const totalItems = await db.item.count({
    where: {
      ...(query && {
        name: {
          contains: query.toLowerCase(),
          mode: 'insensitive',
        },
      }),
    },
  });
  const totalPages = Math.ceil(totalItems / limit);

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
    <main className="text-emerald-950 p-4 space-y-3">
      {/* <Search placeholder="search for..." /> */}

      {/* // TODO: wrap it in suspense to show loading... */}
      <section>
        <ItemsList items={itemsWithFavoriteFlag} />
      </section>
      <section className="flex justify-center">
        <Pagination
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}