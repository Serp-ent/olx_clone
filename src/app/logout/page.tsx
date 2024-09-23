import { signOut } from "../auth";

export default function LogoutPage() {
  return (
    <main className="grid place-content-center">
      <form
        action={async () => {
          'use server';
          await signOut({ redirect: true, redirectTo: "/" });
        }}
      >
        <button className="text-emerald-950 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          Sign Out
        </button>
      </form>
    </main>
  );

}