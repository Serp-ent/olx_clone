import { BsHeart } from "react-icons/bs";
import { Item, ProductImage } from '@prisma/client';
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./components/favoriteButton";

type ProductWithImages = Item & {
  images: ProductImage[]
  isFavorite: boolean,
}

// TODO: add carousel for multiple images
// TODO: add localization of offer
// TODO: add tags
// TODO: add info about user
// TODO: add user stars to indicate opinion
// TODO: add option to display offer only from one person
export default function Card({ item }: { item: ProductWithImages }) {
  return (
    <div className="bg-white text-emerald-950 rounded shadow flex flex-col">
      <Link
        key={item.id}
        href={`/offer/${item.id}`}
        className="flex flex-col grow"
      >
        {item.images.length > 0 ? (
          <div className="relative w-full h-24">
            <Image
              src={item.images[0].url}
              alt={item.name}
              fill
              className="object-contain"
              // width={50}
              // height={50}
            />
          </div>
        ) : (
          <div className="bg-red-300 grid place-content-center text-2xl font-bold">
            photo
          </div>
        )}

        <section className="p-3 space-y-1">
          <div className="flex justify-between items-center">
            <h6 className="text-sm">{item.name}</h6>

            <FavoriteButton
              itemId={item.id.toString()}
              initialIsFavorite={item.isFavorite}
            />
          </div>

          <p className="font-bold">{item.price.toString()} pln</p>

          <div>
            <p className="text-xs">{item.createdAt.toLocaleDateString()}</p>
            <p className="text-xs">{item.createdAt.toLocaleTimeString()}</p>
          </div>
        </section>
      </Link>
    </div>
  );
}