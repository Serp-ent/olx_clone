import { notFound } from "next/navigation";
import { auth } from "../auth";
import db from '@/app/lib/prisma'
import Link from "next/link";
import Profile from "./profile";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    return "Unauthorized";
  }

  const email = session.user!.email!;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return notFound();
  }

  return <Profile userId={user.id}></Profile>
}

