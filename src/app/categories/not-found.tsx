import Link from "next/link";


export default function NotFound() {
  return (
    <main className="grid place-content-center bg-gray-100 p-4">
      <section className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Category Not Found</h1>
          <p className="text-gray-600 mt-2">Sorry, the category you are looking for does not exist.</p>
        </div>
        <Link
          href="/categories"
          className="inline-block mt-4 px-6 py-3 text-white bg-primary rounded-md hover:bg-emerald-800 transition-colors duration-300"
        >
          Show All Categories
        </Link>
      </section>
    </main>
  );
}