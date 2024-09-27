import Link from "next/link";
import { auth } from "../auth";
import db from '@/app/lib/prisma';
import Image from "next/image";
import { BsHeart, BsHeartFill } from "react-icons/bs";

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

  // TODO: use component for items list
  // TODO: allow to add/remove to/from favorites etc
  console.log(userFavorites);
  return (
    <main
      className="px-4 py-2 ">
      <h2 className="font-bold text-lg p-2">
        Observed Items
      </h2>
      <ul
        className="space-y-2">
        {userFavorites?.favorites.map(item => (
          <li
            key={item.id}
            className="bg-white flex justify-between gap-2 items-center shadow p-2  rounded"
          >
            <Link
              href={`/offer/${item.id}`}
              className="grow"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={item.images.at(0)?.url || ''}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded grid border text-xs overflow-hidden text-wrap"
                />

                <h2
                  className="font-bold"
                >
                  {item.name}
                </h2>
              </div>

            </Link>
            {/* TODO: add removing from favorites functionality */}
            <form
              className="p-2 grid place-content-center">
              <button type="submit">
                <BsHeartFill color="red" size={20} />
              </button>
            </form>

          </li>
        ))}

      </ul>
    </main>
  );

}