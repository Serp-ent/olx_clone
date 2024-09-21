import Link from "next/link";
import { BsSearch, BsBell } from "react-icons/bs";

export default function Header() {
  return (
    <header className="bg-neutral-800 px-3 py-5 flex gap-4 items-center justify-between">
      <Link href='/search' className="flex grow">
        <input
          className="grow bg-zinc-900 p-3"
          placeholder="Search for..."
        />

        <div className="grow-0 bg-emerald-950 p-3 grid content-center" >
          <button>
            <BsSearch size={24} />
          </button>
        </div>
      </Link>

      <button>
        <BsBell
          className="grow-0"
          size={24}
        />
      </button>
    </header>
  );
}