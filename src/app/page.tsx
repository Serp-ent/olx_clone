import Link from "next/link";

export default function Home() {
  // TODO: improve style
  return (
    <>
      <section className="bg-zinc-900 p-4">
        <div className="flex justify-between">
          <h2>Categories</h2>
          <Link href='/categories'>
            See all
          </Link>
        </div>

        <hr />

        <div>

        </div>
      </section>
    </>
  );
}
