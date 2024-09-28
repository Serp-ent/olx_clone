import type { Item, ProductImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./favoriteButton";

type ProductWithImages = Item & {
  images: ProductImage[],
  isFavorite: boolean,
}

export default function Item({ item }: { item: ProductWithImages }) {
  // TODO: this should have price
  // TODO: this should have date added and location

  return (
    <div
      className="bg-white flex h-24 justify-between shadow border rounded-md p-2"
    >
      <Link
        className="flex items-center gap-2 grow"
        href={`/offer/${item.id}`}
      >
        <div className="aspect-square relative h-full">
          <Image
            src={item.images.at(0)?.url || ''}
            alt={item.name}
            fill
            className="object-contain rounded-md"
          />
        </div>


        <h3 className="grow">
          Item {item.id}
        </h3>
      </Link>

      <div className="text-2xl grid items-center pr-2">
        <FavoriteButton
          itemId={item.id.toString()}
          // TODO: fix hardcoded value to receive it from db
          initialIsFavorite={item.isFavorite}
        />
      </div>
    </div>
  );
}