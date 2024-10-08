import db from '@/app/lib/prisma'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth, signOut } from '../auth';
import Image from 'next/image';

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

  const email = (await auth())!.user!.email!
  // TODO: the auth() should contain email and id (not optional);
  const userOwnProfile = user.email === email;

  // TODO: add star reviews

  return (
    <main className="h-full bg-[#f2f3f4] flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-[#002f34] p-6 text-white flex items-center">
          {/* TODO: profile pic */}
          <div className=" border-[#23b2b0] h-24 shrink-0 border-4 aspect-square relative rounded-full overflow-hidden">
            TODO: Avatar
            <Image
              src={user.profilePictureUrl || ""}
              alt="Profile Picture"
              className="object-cover h-full w-full"
              fill
            />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{user.firstName}</h1>
            <p className="text-xs">
              Member since {user.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 bg-white text-[#002f34]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            {/* TODO: refactor this should be 2 columns with data left aligned */}
            <div>
              <h2 className="text-xl font-semibold text-[#002f6c] mb-4">Personal Information</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Full Name:</span>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Email:</span>
                  <span>{user.email}</span>
                </div>
                {user.phoneNumber && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Phone:</span>
                    <span>{user.phoneNumber}</span>
                  </div>
                )}
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
        {/* TODO: show edit button only when its own user profile */}
        {userOwnProfile && (
          <div className="bg-secondary px-2 py-2 flex justify-center items-center gap-2">
            <Link
              href={'/myOffers'}
              className="text-emerald-950 flex items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              My Offers
            </Link>
            <Link
              href='/profile/edit'
              className="text-emerald-950 flex items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              Edit Profile
            </Link>
            <form
              action={async () => {
                'use server';
                await signOut({ redirect: true, redirectTo: "/" });
              }}
            >
              <button className="text-emerald-950 flex items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                Sign Out
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}