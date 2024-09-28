import ItemsList from '@/app/components/itemsList';
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
  return (
    <main>
      <ItemsList categoryId={id} />
    </main>

  );
}