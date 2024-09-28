import Image from "next/image";
import db from '@/app/lib/prisma';
import { notFound, redirect } from "next/navigation";
import { BsFlag, BsHeart, BsHeartFill, BsChevronRight } from "react-icons/bs";
import { toggleFavorites } from "@/app/lib/actions";
import { auth } from "@/app/auth";
import UserShort from "../../components/userShort";
import Link from "next/link";
import FavoriteButton from "@/app/components/favoriteButton";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ImageCarousel from "./imageCarousel";

export default async function OfferPage({ params }:
  { params: { id: string } }
) {
  // TODO: add loading...
  const item = await db.item.findUnique({
    where: { id: Number(params.id) },
    include: {
      images: true
    }
  });

  if (!item) {
    notFound();
  }

  // Fetch the user's favorites
  const userId = (await auth())?.user?.email; // Replace with the actual user ID from your session/context
  if (!userId) {
    // TODO: refactor
    redirect('/login');
  }

  const userFavorites = await db.user.findUnique({
    where: { email: userId },
    include: { favorites: true }
  });

  // TODO: add option for removing offer
  // TODO: this should be done using db
  const isFavorite = userFavorites?.favorites.some((product) => product.id === item.id) || false;
  // TODO: add adding offer to favorites
  {/* TODO: there should be image carousel */ }
  // TODO: the image should fill whole width
  return (
    <main className="grid grid-rows-1">
      {/* // TODO: fix carousel to show dots etc. */}
      <section className="w-screen h-44">
        {/* // TODO: add image carousel */}
        <ImageCarousel images={item.images} />
      </section>
      <section className="bg-gray-100 grow text-emerald-950 p-4 rounded-t-lg relative">
        {/* TODO: play animation on added */}
        {/* <form
          className="absolute right-10 top-0 -translate-y-1/2 p-2 border bg-red-200 rounded-full"
          action={toggleFavoritesId}
        >
          <button>
            {isFavorite ? (
              <BsHeartFill color="red" size={20} />
            ) : (
              <BsHeart color="red" size={20} />
            )}
          </button>

        </form> */}
        <section
          className="z-10 text-xl absolute right-10 top-0 -translate-y-1/2 p-2 grid place-content-center border bg-red-200 rounded-full"
        >
          <FavoriteButton itemId={params.id} initialIsFavorite={isFavorite} />
        </section>

        <h6 className="text-xs">
          {item.createdAt.toLocaleTimeString()}
        </h6>
        <h1 className="font-bold">{item.name}</h1>
        <section>
          <div className="border-2 rounded p-2">
            Only item:
            <p className="font-bold">{item.price.toString()} pln</p>
          </div>
          <div className="border-2 rounded p-2">
            Price with shipment:
            <p className="font-bold">{Number(item.price.toString()) + 5.0} pln</p>
          </div>
        </section>

        <section className="flex gap-2 p-2">
          {/* TODO: add tags */}
          {/* TODO: pretty print multiple tags in multiple rows if cannot fit in one */}
          {['tag1', 'tag2', 'tag3'].map(tag => (
            <div
              key={tag}
              className="border-2 p-1 rounded text-xs"
            >
              {tag}
            </div>
          ))}
        </section>

        <hr />

        <section className="p-1 text-sm">
          <h2 className="uppercase text-xs font-bold">Description</h2>
          <p>
            {item.description}
          </p>
        </section>

        <hr />

        <section className="p-1 text-red-600 text-sm font-bold underline flex justify-start gap-1 items-center">
          <BsFlag size={14} />
          <span>Report</span>
        </section>

        <section>
          <UserShort userId={item.authorId} />

          <hr className="border border-gray-300 m-2" />

          <div className="grid place-content-center">
            <Link
              href={`/profile/${item.authorId}/offers`}
              className="text-sm flex gap-2 items-center">
              More from this seller
              <BsChevronRight />
            </Link>
          </div>

          <hr className="border border-gray-300 m-2" />
        </section>

        {/* <section>
        // TODO: here should be localization of offer with google maps component
        </section> */}
        {/* <section>
        TODO: other offers from this user
        </section>
        Hello
        offer with id {params.id} */}

        {/* <section>
        TODO: see also section
        </section>
        Hello
        offer with id {params.id} */}
      </section>
    </main>
  );

  // TODO: additionally there should be bottom popup that recommends to create account
}