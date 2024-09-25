import Link from "next/link";
import { redirect } from "next/navigation";
import { BsSearch, BsBell } from "react-icons/bs";

// TODO: use tailwind variables
// Primary color: #002f34 (Dark Green)
// Secondary color: #002f6c (Dark Blue)
// Accent color: #23b2b0 (Turquoise)
// Background color: #f2f3f4 (Light Gray)

// TODO: add dropdown from notification bell

export async function searchAction(formData: FormData) {
  'use server';

  const searchTerm = formData.get('search') as string;
  // Optionally handle the search logic here, e.g., log or process the search term
  // Redirect to the search results page with the query
  redirect(`/search?q=${encodeURIComponent(searchTerm)}`);
}

export default function Header() {
  return (
    <header className="bg-neutral-800 px-3 py-5 flex gap-4 items-center justify-between">
      <form
        action={searchAction}
        className="flex grow">
        <input
          className="w-full p-2 bg-zinc-900"
          name="search"
          placeholder="Search for..."
        />

        <div className="grow-0 bg-emerald-950 p-3 grid content-center">
          <button type="submit">
            <BsSearch size={22} />
          </button>
        </div>
      </form>

      <button>
        <BsBell
          className="grow-0"
          size={22}
        />
      </button>
    </header>
  );
}