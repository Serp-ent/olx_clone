'use client';

import BarLoader from "react-spinners/BarLoader";

export default function ItemsGridLoading() {
  {/* TODO: should add ItemsGrid skeleton */ }
  return (
    <section className="h-full grid place-content-center">
      <BarLoader color="#002f34" />
    </section>
  );
}