import db from '@/app/lib/prisma'
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Profile(
  { userId }: { userId: string }) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          // products: true,
          favorites: true,
          products: true,
        }
      },
    }
  });
  if (!user) {
    return notFound();
  }

  // TODO: add star reviews

  return (
    <main className="h-full bg-[#f2f3f4] flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-[#002f34] p-6 text-white flex items-center">
          <div className="h-24 aspect-square shrink-0 rounded-full overflow-hidden border-4 border-[#23b2b0]">
            {/* TODO: profile pic */}
            <div className="rounded-full bg-red-300 h-full grid place-content-center">
              TODO: Avatar
            </div>
            {/* <img
              src="/profile-pic-placeholder.jpg"
              alt="Profile Picture"
              className="object-cover h-full w-full"
            /> */}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">TODO:</h1>
            <p className="text-xs">
              Member since {user.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 bg-white text-[#002f34]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div>
              <h2 className="text-xl font-semibold text-[#002f6c] mb-4">Personal Information</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Full Name:</span>
                  <span>TODO:</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Phone:</span>
                  <span>TODO:</span>
                </div>
              </div>
            </div>

            {/* // TODO: these should be links for details */}
            <div>
              <h2 className="text-xl font-semibold text-[#002f6c] mb-4">Account Information</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Ads Posted:</span>
                  <span>{user._count.products}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Items Sold:</span>
                  <span>TODO:</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Wishlist Items:</span>
                  <span>{user._count.favorites}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Edit Profile Button */}
        {/* TODO: show edit button only when its own user profile
        <div className="bg-[#002f6c] p-4 text-center">
          <Link
            href='/profile/edit'
            className="px-4 py-2 text-white bg-[#23b2b0] rounded-lg hover:bg-[#1d9f9e]"
          >
            Edit Profile
          </Link>
        </div> */}
      </div>
    </main>
  );
}