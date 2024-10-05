import db from '@/app/lib/prisma'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from "next/navigation";

export default async function UserShort({ userId }: { userId: string }) {
  const user = await db.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    return notFound();
  }

  return (
    <Link
      href={`/profile/${user.id}`}
      className="shadow-md rounded p-4 flex gap-2 items-center"
    >
      <div className="relative rounded-full aspect-square h-16 overflow-hidden">
        <Image
          src={user.profilePictureUrl || ''}
          alt={`${user.firstName} ${user.lastName} profile picture`}
          fill
        />
      </div>
      <div>
        <h4 className='font-bold'>
          {user.firstName} {user.lastName}
        </h4>
        <h6 className='text-xs' >
          Joined at {user.createdAt.toLocaleDateString()}
        </h6>
      </div>
    </Link>
  );
}