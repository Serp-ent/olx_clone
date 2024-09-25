import db from '@/app/lib/prisma'
import Item from './item';

export default async function ItemsList({ query }: { query: string }) {
  const items = await db.product.findMany({
    where: {
      name: {
        contains: query.toLowerCase(),
        mode: 'insensitive',
      }
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