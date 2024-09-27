
// TODO: change title for the whole page
// TODO: add pagination 
// TODO: add sorting by newest, most hearted, oldest etc...
// TODO: add notFound if there is no items matching query

import ItemsList from "../components/itemsList";
import Search from "./search";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string,
    // TODO: page?: string,
  }
}) {
  const query = searchParams?.q || '';

  return (
    <main className="text-emerald-950 p-4">
      {/* <Search placeholder="search for..." /> */}

      {/* // TODO: wrap it in suspense to show loading... */}
      <ItemsList query={query} />
    </main>
  );
}