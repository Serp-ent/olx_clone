import Link from "next/link";
import { BsSearch, BsBell } from "react-icons/bs";

// TODO: use tailwind variables
// Primary color: #002f34 (Dark Green)
// Secondary color: #002f6c (Dark Blue)
// Accent color: #23b2b0 (Turquoise)
// Background color: #f2f3f4 (Light Gray)

export default function Header() {
  return (
    <header className="bg-neutral-800 px-3 py-5 flex gap-4 items-center justify-between">
      <Link href='/search' className="flex grow">
        <input
          className="w-full p-2 bg-zinc-900"
          placeholder="Search for..."
        />

        <div className="grow-0 bg-emerald-950 p-3 grid content-center">
          <button>
            <BsSearch size={22} />
          </button>
        </div>
      </Link>

      <button>
        <BsBell
          className="grow-0"
          size={22}
        />
      </button>
    </header>
  );
}