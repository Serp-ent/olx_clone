import { BsHeart } from "react-icons/bs";
import { Product } from '@prisma/client';


export default function Card({ item }: { item: Product }) {
  return (
    <div
      key={item.id}
      className="bg-gray-400 aspect-[3/4] rounded"
    >
      <div className="bg-red-300 h-2/3 grid place-content-center text-2xl font-bold">
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

    </div>
  )
}