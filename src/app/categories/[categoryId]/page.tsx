import { auth } from '@/app/auth';
import ItemsList from '@/app/components/itemList';
import Pagination from '@/app/components/pagination';
import db from '@/app/lib/prisma'
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params, searchParams }: {
  params: {
    categoryId: string,
  },
  searchParams: {
    page?: string
  }
}) {
  const id = parseInt(params.categoryId) || -1;
  const category = await db.category.findUnique({ where: { id } });
  if (!category) {
    return notFound();
  }

  // TODO: add custom page if there is no items for given category
  // TODO: add loading skeleton as the elements are loading
  // TODO: allow user specify how much elements he would like to limit currently hard code0
  const limit = 10;
  // TODO: fix that disgusting handling of strings
  const page = parseInt(searchParams.page || '1') || 1;
  const step = (page - 1) * limit;

  // filter items for given category
  const session = await auth(); // Assuming you're getting session info
  const email = session?.user?.email; // Get the user ID from the session

  const items = await db.item.findMany({
    where: {
      categoryId: parseInt(params.categoryId),
    },
    include: {
      images: true,
    },
    skip: step,
    take: limit
  });

  const totalItems = await db.item.count({ where: { categoryId: parseInt(params.categoryId) } });
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
    <main className='p-4 space-y-3'>
      <h1 className='font-bold text-2xl pb-2'>
        {category.name}
      </h1>

      <section>
        <ItemsList items={itemsWithFavoriteFlag} />
      </section>

      <section className='flex justify-center'>
        <Pagination
          totalPages={totalPages}
          limit={limit}
        />
      </section>
    </main>

  );
}