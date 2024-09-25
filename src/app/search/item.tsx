import { Product, ProductImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ProductWithImages = Product & {
  images: ProductImage[]
}

export default function Item({ item }: { item: ProductWithImages }) {
  // TODO: add button for adding for favorites
  return (
    <Link
      className="flex h-16 justify-between border rounded-md px-2"
      href={`/offer/${item.id}`}
    >
      <div className="aspect-square relative">
        <Image
          src={item.images.at(0)?.url || ''}
          alt={item.name}
          fill
          className="object-contain rounded-md"
        />
      </div>

      <div className="flex items-center">
        Item {item.id}
      </div>
    </Link>
  );
}