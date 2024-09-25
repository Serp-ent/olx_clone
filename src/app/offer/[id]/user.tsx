import db from '@/app/lib/prisma'
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
      <div className="bg-red-950 rounded-full aspect-square h-14">
      </div>
      <div>
        <h4 className='font-bold'>
          {user.email}
        </h4>
        <h6 className='text-sm' >
          Joined at {user.createdAt.toLocaleDateString()}
        </h6>
      </div>
    </Link>
  );
}