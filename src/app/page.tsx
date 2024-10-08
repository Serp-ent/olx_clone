import Link from "next/link";
import db from '@/app/lib/prisma';
import Image from "next/image";
import ItemsGrid from "./itemsGrid";
import { Suspense } from "react";
import ItemsGridLoading from "./itemsGridLoading";

export default async function Home() {
  // TODO: provide infinite scrolling for newly added items

  const categories = await db.category.findMany();

  return (
    <main className="flex flex-col">
      <section className="bg-white shadow">
        <section className="px-4 py-6 space-y-2">
          <div className="flex justify-between">
            <h2 className="font-bold">Categories</h2>
            <Link
              href='/categories'
              className="text-sm text-gray-600">
              See all
            </Link>
          </div>
          <hr />
        </section>

        <div className="w-screen px-4 pb-6">
          <ul
            className="flex gap-2 overflow-x-auto pb-4"
          >
            {
              categories.map((category) => (
                <li
                  key={category.id}
                >
                  <Link
                    href={`/categories/${category.id}`}
                    className="flex flex-col items-center gap-2"
                  >
                    {(category.imageUrl != null) ? (
                      <div className="rounded-full border-secondary border-2 overflow-hidden w-24 h-24 text-3xl grid place-content-center ">
                        <Image
                          src={category.imageUrl}
                          alt={category.name + 'category photo'}
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : (
                      <div className="border-2 border-secondary bg-primary text-white text-sm overflow-hidden rounded-full w-24 h-24 grid place-content-center text-center ">
                        {category.name}
                      </div>
                    )}
                    <h4 className="text-sm">{category.name}</h4>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      <Suspense fallback={<ItemsGridLoading />}>
        <ItemsGrid />
      </Suspense>
    </main >
  );
}
