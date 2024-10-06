// TODO: middleware should redirect to login page

import Link from "next/link";
import { auth } from "../auth";
import ItemsList from "../components/itemList";
import db from '@/app/lib/prisma';
import Image from "next/image";
import { BsFillTrashFill, BsPencil, BsPencilFill, BsTrash2Fill } from "react-icons/bs";
import DeleteOfferButton from "./deleteOfferButton";
import EditOfferButton from "./editOfferButton";
import Pagination from "../components/pagination";

// TODO: SEO
// TODO: hide/show offers 
// TODO: ability to edit offer
// TODO: post creation should redirect to /offer/id
export default async function MyOffers({
  searchParams
}: {
  searchParams?: {
    page: string,
  }
}) {
  const session = await auth();
  if (!session) {
    throw new Error('User is not authenticated');
  }

  const limit = 10;
  // TODO: fix that disgusting handling of strings
  const page = parseInt(searchParams?.page || '1') || 1;
  const step = (page - 1) * limit;

  const id = session.user!.id!;
  const items = await db.item.findMany({
    where: {
      authorId: id,
    },
    include: {
      images: true,
    },
    skip: step,
    take: limit,
  });

  const totalItems = await db.item.count({
    where: {
      authorId: id,
    },
  });
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <main className="p-4 space-y-2">
      <h1 className="font-bold text-2xl">
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
                <EditOfferButton id={item.id} />
                <DeleteOfferButton
                  id={item.id}
                  redirectLink={null}
                />
              </div>
            </li>
          )}
        </ul>
      </section>

      {totalPages > 1 && (
        <section className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            limit={limit}
          />

        </section>
      )}
    </main>
  );
}