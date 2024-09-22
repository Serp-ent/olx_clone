import Image from "next/image";
import db from '@/app/lib/prisma';
import { notFound } from "next/navigation";
import { BsFlag } from "react-icons/bs";

export default async function OfferPage({ params }:
  { params: { id: string } }
) {
  // TODO: add loading...
  const item = await db.product.findUnique({
    where: { id: Number(params.id) },
    include: {
      images: true
    }
  });

  if (!item) {
    notFound();
  }

  // TODO: add adding offer to favorites
  {/* TODO: there should be image carousel */ }
  // TODO: the image should fill whole width
  return (
    <main className="grid grid-rows-1">
      <section className="grid place-content-center">
        <Image
          src={item.images.at(0)?.url || ""}
          alt={item.name}
          height={100}
          width={100}
        />
      </section>
      <section className="bg-gray-100 grow text-emerald-950 p-4 rounded-t-lg">
        <h6 className="text-xs">
          {item.createdAt.toLocaleTimeString()}
        </h6>
        <h1 className="font-bold">{item.name}</h1>
        <section>
          <div className="border-2 rounded p-2">
            Only item:
            <p className="font-bold">{item.price.toString()} pln</p>
          </div>
          <div className="border-2 rounded p-2">
            Price with shipment:
            <p className="font-bold">{Number(item.price.toString()) + 5.0} pln</p>
          </div>
        </section>

        <section className="flex gap-2 p-2">
          {/* TODO: add tags */}
          {/* TODO: pretty print multiple tags in multiple rows if cannot fit in one */}
          {['tag1', 'tag2', 'tag3'].map(tag => (
            <div
              key={tag}
              className="border-2 p-1 rounded text-xs"
            >
              {tag}
            </div>
          ))}
        </section>

        <hr />

        <section className="p-1 text-sm">
          <h2 className="uppercase text-xs font-bold">Description</h2>
          <p>
            {item.description}
          </p>
        </section>

        <hr />

        <section className="p-1 text-red-600 text-sm font-bold underline flex justify-start gap-1 items-center">
          <BsFlag size={14} />
          <span>Report</span>
        </section>

        <section>
          TODO: There should be user component
        </section>
        {/* <section>
          There should be other offers from user
        </section>
        Hello
        offer with id {params.id} */}
      </section>
    </main>
  );

  // TODO: additionally there should be bottom popup that recommends to create account
}