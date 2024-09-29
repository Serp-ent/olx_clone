import Link from "next/link";
import { auth } from "../auth";
import db from '@/app/lib/prisma';
import Image from "next/image";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import FavoriteButton from "../components/favoriteButton";
import { Item, ProductImage } from "@prisma/client";
import ItemsList from "../components/itemList";

type ProductWithImages = Item & {
  images: ProductImage[],
  isFavorite: boolean,
};


export default async function ObservedPage() {
  // TODO: add pagination
  const session = await auth();
  if (!session) {
    return 'Unauthorized';
  }

  // TODO: refactor these nasty !
  // TODO: add dates when item was added to favorites and allow sorting
  const email = session.user!.email!;
  const userFavorites = await db.user.findUnique({
    where: { email },
    include: {
      favorites: {
        include: {
          images: true,
        }
      }
    }
  });

  const items = userFavorites!.favorites as ProductWithImages[];
  items.forEach((item) => item.isFavorite = true);

  // TODO: use component for items list
  // TODO: allow to add/remove to/from favorites etc
  // TODO: use itemsList component
  return (
    <main
      className="px-4 py-2 ">
      <h2 className="font-bold text-lg p-2">
        Observed Items
      </h2>

      <section>
        <ItemsList items={items} />
      </section>
    </main>
  );

}