import db from '@/app/lib/prisma';
import Card from './card';

export default async function ItemsGrid() {
  const items = await db.item.findMany({
    include: {
      images: true
    }
  });

  return (
    <section className="p-4 bg-emerald-950 grow">
      <h3
        className="font-bold text-xl pb-4">
        Chosen for you
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </section>
  );
}