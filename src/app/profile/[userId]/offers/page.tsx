import ItemsList from '@/app/components/itemsList';
import db from '@/app/lib/prisma';
import { notFound } from 'next/navigation';

export default async function OffersOfUser({ params }: {
  params: {
    userId: string,
  }
}) {
  const user = await db.user.findUnique({ where: { id: params.userId } });
  if (!user) {
    // TODO: add custom page 
    return notFound();
  }

  return (
    <main className="bg-white p-4">
      <ItemsList authorId={user.id} />
    </main>
  );
}