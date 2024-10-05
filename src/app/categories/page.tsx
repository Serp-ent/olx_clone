import db from '@/app/lib/prisma';
import Image from 'next/image';
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
            className='p-1 rounded bg-white shadow'
          >
            <Link
              href={`/categories/${category.id}`}
              className='flex justify-between items-center'
            >
              <div className='h-20 aspect-square rounded-full overflow-hidden border-primary  border-2 text-xs relative'>
                <Image
                  src={category.imageUrl || ''}
                  alt={`${category.name} image`}
                  fill
                />

              </div>

              <h3 className='font-bold text-right pr-2'>
                {category.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );

}