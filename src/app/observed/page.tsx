import Link from "next/link";
import { auth } from "../auth";
import db from '@/app/lib/prisma';
import Image from "next/image";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import FavoriteButton from "../components/favoriteButton";
import { Item, ProductImage } from "@prisma/client";
import ItemsList from "../components/itemList";
import Pagination from "../components/pagination";

type ProductWithImages = Item & {
  images: ProductImage[],
  isFavorite: boolean,
};


export default async function ObservedPage({
  searchParams
}: {
  searchParams: {
    page: string
  }
}
) {
  const session = await auth();
  if (!session) {
    return 'Unauthorized';
  }

  // TODO: refactor these nasty !
  // TODO: add dates when item was added to favorites and allow sorting
  const limit = 10;
  // TODO: fix that disgusting handling of strings
  const page = parseInt(searchParams?.page || '1') || 1;
  const step = (page - 1) * limit;

  const email = session.user!.email!;
  const userFavorites = await db.user.findUnique({
    where: { email },
    include: {
      favorites: {
        include: {
          images: true,
        },
        skip: step,
        take: limit,
      }
    },
  });

  const items = userFavorites!.favorites as ProductWithImages[];
  items.forEach((item) => item.isFavorite = true);

  const totalItems = await db.item.count({
    where: {
      favoritedBy: {
        some: {
          id: userFavorites?.id,
        }
      }
    },
  });
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <main
      className="px-4 py-2 space-y-2">
      <h2 className="font-bold text-lg p-2">
        Observed Items
      </h2>

      <section>
        <ItemsList items={items} />
      </section>

      {totalPages > 1 && (
        <section className="flex justify-center">
          <Pagination
            totalPages={totalPages}
          />
        </section>
      )}
    </main>
  );

}