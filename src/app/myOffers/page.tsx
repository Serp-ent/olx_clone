// TODO: middleware should redirect to login page

import Link from "next/link";
import { auth } from "../auth";
import ItemsList from "../components/itemList";
import db from '@/app/lib/prisma';
import Image from "next/image";
import { BsFillTrashFill, BsPencil, BsPencilFill, BsTrash2Fill } from "react-icons/bs";
import DeleteOfferButton from "./deleteOfferButton";

const actions = [
  {
    icon: <BsPencilFill />,
    action: null,
  },
]

// TODO: SEO
// TODO: hide/show offers 
// TODO: ability to edit offer
export default async function MyOffers() {
  const session = await auth();
  if (!session) {
    throw new Error('User is not authenticated');
  }

  const id = session.user!.id!;
  const items = await db.item.findMany({
    where: {
      authorId: id,
    },
    include: {
      images: true,
    }
  });

  return (
    <main className="p-4">
      <h1 className="font-bold text-2xl pb-2">
        My Offers
      </h1>
      <section>
        <ul className="space-y-2">
          {items.map(item =>
            <li
              key={item.id}
              className="flex gap-2 items-center bg-white py-1 rounded shadow"
            >
              <Link
                href={`/offer/${item.id}`}
                className="grow flex items-center gap-2"
              >
                <div className="h-20 aspect-square relative">
                  <Image
                    src={item.images.at(0)?.url || ''}
                    alt={`${item.name} photo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold">
                  {item.name}
                </h3>
              </Link>
              <div className="text-xl grow-0 pr-3 flex gap-2 items-center justify-start" >
                {actions.map((action, i) =>
                  <button
                    key={i}
                    className="text-xl"
                  >
                    {action.icon}
                  </button>
                )}
                <DeleteOfferButton id={item.id} />
              </div>
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}