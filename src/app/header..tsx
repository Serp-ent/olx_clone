import { redirect } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import NotificationButton from "./components/notificationButton";

// TODO: add dropdown from notification bell

// TODO: clear the input as the user navigates

export async function searchAction(formData: FormData) {
  'use server';

  const searchTerm = formData.get('search') as string;
  // Optionally handle the search logic here, e.g., log or process the search term
  // Redirect to the search results page with the query
  redirect(`/search?q=${encodeURIComponent(searchTerm)}`);
}

export default function Header() {
  return (
    <header className="bg-background px-3 py-5 flex gap-4 items-center justify-between shadow">
      <form
        action={searchAction}
        className="flex grow">
        <input
          className="w-full px-4 py-2 rounded-l placeholder:text-gray-500"
          name="search"
          placeholder="Search for..."
        />

        <div className="rounded-r grow-0 bg-primary p-3 grid content-center">
          <button type="submit">
            <BsSearch color='white' size={22} />
          </button>
        </div>
      </form>

      <NotificationButton></NotificationButton>
    </header>
  );
}