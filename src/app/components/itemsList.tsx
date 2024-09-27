import db from '@/app/lib/prisma'
import Item from './item';

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
  return (
    <ul className='p-2 space-y-1'>
      {items.map((item) =>
        <li key={item.id}>
          <Item item={item} />
        </li>)}

    </ul>
  );
}