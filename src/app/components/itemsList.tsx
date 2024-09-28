import db from '@/app/lib/prisma'
import Item from './item';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import EmptyList from './emptyList';

export default async function ItemsList(
  { query, categoryId, authorId }
    : { query?: string, categoryId?: number, authorId?: string }
) {
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

  if (items.length === 0) {
    return <EmptyList />
  }

  return (
    <ul className='p-2 space-y-1'>
      {items.map((item) =>
        <li key={item.id}>
          <Item item={item} />
        </li>)}

    </ul>
  );
}