import type { Item, ProductImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./favoriteButton";

type ProductWithImages = Item & {
  images: ProductImage[],
  isFavorite: boolean,
}

function formatTimeOrDate(item: Item) {
  const createdAt = new Date(item.createdAt); // Ensure createdAt is a Date object
  const now = new Date(); // Current date and time

  // Check if the createdAt date is the same as the current date
  const isSameDay = createdAt.getDate() === now.getDate() &&
    createdAt.getMonth() === now.getMonth() &&
    createdAt.getFullYear() === now.getFullYear();

  // Formatting options
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  if (isSameDay) {
    // If the same day, return time string (you can adjust the format as needed)
    return createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // If different day, return date string
    return createdAt.toLocaleDateString(undefined, options);
  }
}


export default function Item({ item }: { item: ProductWithImages }) {
  // TODO: add localization to item
  const timeAdded = formatTimeOrDate(item);

  return (
    <div
      className="bg-white flex h-24 justify-between shadow border rounded-md p-2 gap-4"
    >
      <Link
        className="flex gap-2 grow"
        href={`/offer/${item.id}`}
      >
        <div className="border-2 rounded-md aspect-square relative h-full">
          <Image
            src={item.images.at(0)?.url || ''}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        {/* // TODO: add information if item was used below */}
        <div className="flex flex-col grow truncate justify-between">
          {/* // TODO: add hover that switches to bg:primary and text white */}
          <h3 className="grow">
            {item.name}
          </h3>

          <h6 className="text-[0.6rem] text-gray-500">
            {`${'TODO Localization'} - ${timeAdded}`}
          </h6>

        </div>

      </Link>

      <div className="flex flex-col justify-between">
        <section className="font-semibold text-sm">
          {item.price.toString()} zl
          {/* // TODO: below price should be info if price is negotiable */}
        </section>

        <div className="pr-2 flex justify-end">
          <FavoriteButton
            itemId={item.id.toString()}
            initialIsFavorite={item.isFavorite}
          />
        </div>

      </div>
    </div>
  );
}