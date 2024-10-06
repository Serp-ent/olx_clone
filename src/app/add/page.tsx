import db from '@/app/lib/prisma'
import AddItemForm from './addItemForm';

/* TODO: each category requires their own filters
e.g. cars have price, model, production date hp etc...
*/

export default async function AddPage() {
  const categories = await db.category.findMany();
  return (
    <main className="p-2 bg-white">
      <AddItemForm
        categories={categories}
      />
    </main>
  );

}