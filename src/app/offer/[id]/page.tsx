import Image from "next/image";
import db from '@/app/lib/prisma';
import { notFound } from "next/navigation";
import { BsFlag, BsHeart, BsHeartFill } from "react-icons/bs";
import { toggleFavorites } from "@/app/lib/actions";
import { auth } from "@/app/auth";

export default async function OfferPage({ params }:
  { params: { id: string } }
) {
  // TODO: add loading...
  const item = await db.item.findUnique({
    where: { id: Number(params.id) },
    include: {
      images: true
    }
  });

  if (!item) {
    notFound();
  }

  // Fetch the user's favorites
  const userId = (await auth())?.user?.email; // Replace with the actual user ID from your session/context
  if (!userId) {
    // TODO: refactor
    throw new Error('User not authorized');
  }

  const userFavorites = await db.user.findUnique({
    where: { email: userId },
    include: { favorites: true }
  });

  const isFavorite = userFavorites?.favorites.some((product) => product.id === item.id);

  // TODO: add adding offer to favorites
  {/* TODO: there should be image carousel */ }
  // TODO: the image should fill whole width
  const toggleFavoritesId = toggleFavorites.bind(null, params.id);
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
      <section className="bg-gray-100 grow text-emerald-950 p-4 rounded-t-lg relative">
        <form
          className="absolute right-10 top-0 -translate-y-1/2 p-2 border bg-red-200 rounded-full"
          action={toggleFavoritesId}
        >
          {/* TODO: play animation on added */}
          <button>
            {isFavorite ? (
              <BsHeartFill color="red" size={20} />
            ) : (
              <BsHeart color="red" size={20} />
            )}
          </button>

        </form>

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