import { BsHeart } from "react-icons/bs";
import { Product } from '@prisma/client';
import Link from "next/link";


// TODO: add carousel for multiple images
// TODO: add localization of offer
// TODO: add tags
// TODO: add info about user
// TODO: add user stars to indicate opinion
// TODO: add option to display offer only from one person
export default function Card({ item }: { item: Product }) {
  return (
    <Link
      key={item.id}
      href={`/offer/${item.id}`}
      className="bg-gray-400"
    >
      <div className="bg-red-300 grid place-content-center text-2xl font-bold">
        photo
      </div>

      <section className="p-2 space-y-1">
        <div className="flex justify-between items-center">
          <h6 className="text-sm">
            {item.name}
          </h6>
          <BsHeart />
        </div>
        <p className="text-xs">
          {item.description}
        </p>

      </section>

    </Link>
  )
}