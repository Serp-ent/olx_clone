import Link from "next/link";

export default function Home() {
  // TODO: improve style
  // TODO: fetch from db
  // TODO: provide infinite scrolling for newly added items
  const items: string[] = [];
  for (let i = 0; i < 10; ++i) {
    items.push(i.toString());
  }

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
              items.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="bg-red-300 rounded-full w-24 h-24 text-3xl grid place-content-center ">
                    {i}
                  </div>
                  <h4 className="text-sm">Category {i}</h4>
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
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-gray-400 aspect-[3/4]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
