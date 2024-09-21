import Link from "next/link";
import db from '@/app/lib/prisma';
import { BsHeart } from "react-icons/bs";
import Card from "./card";

export default async function Home() {
  // TODO: improve style
  // TODO: fetch from db
  // TODO: provide infinite scrolling for newly added items

  const items = await db.product.findMany();
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
                  <div className="bg-red-300 rounded-full w-24 h-24 text-3xl grid place-content-center ">
                    {category.id}
                  </div>
                  <h4 className="text-sm">{category.name}</h4>
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      <section className="p-4 bg-emerald-950 grow">
        <h3
          className="font-bold text-xl pb-4">
          Chosen for you
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => <Card key={item.id} item={item}/>)}
        </div>
      </section>
    </main>
  );
}
