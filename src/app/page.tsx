import Link from "next/link";
import db from '@/app/lib/prisma';
import Image from "next/image";
import ItemsGrid from "./itemsGrid";
import { Suspense } from "react";
import ItemsGridLoading from "./itemsGridLoading";

export default async function Home() {
  // TODO: improve style
  // TODO: fetch from db
  // TODO: provide infinite scrolling for newly added items

  const categories = await db.category.findMany();

  return (
    <main className="flex flex-col">
      <section className="bg-zinc-900">
        <section className="px-4 py-6 space-y-2">
          <div className="flex justify-between">
            <h2>Categories</h2>
            <Link href='/categories'>
              See all
            </Link>
          </div>
          <hr />
        </section>

        <div className="w-screen px-4">
          <ul
            className="flex gap-2 overflow-x-auto pb-4"
          >
            {
              categories.map((category) => (
                <li
                  key={category.id}
                  className="flex flex-col items-center gap-2"
                >
                  {/* TODO: fix hardcoded size */}
                  {/* TODO: link to categories and its items */}
                  {(category.imageUrl != null) ? (
                    <div className="bg-red-300 rounded-full overflow-hidden w-24 h-24 text-3xl grid place-content-center ">
                      <Image
                        src={category.imageUrl}
                        alt={category.name + 'category photo'}
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <div className="bg-emerald-950 text-sm overflow-hidden rounded-full w-24 h-24 grid place-content-center text-center ">
                      {category.name}
                    </div>
                  )}
                  <h4 className="text-sm">{category.name}</h4>
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      <Suspense fallback=<ItemsGridLoading />>
        <ItemsGrid />
      </Suspense>
    </main >
  );
}
