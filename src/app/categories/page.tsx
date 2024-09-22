import db from '@/app/lib/prisma';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await db.category.findMany();
  return (
    <main
      className='p-4'
    >
      <ul className='space-y-2'>
        {categories.map((category) => (
          <li
            key={category.id}
            className='border-emerald-950 border p-1 rounded'
          >
            <Link
              href={`/categories/${category.id}`}
              className='block'
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* TODO: fetch categories and add with list */}
    </main>
  );

}