'use client';

import BarLoader from "react-spinners/BarLoader";

export default function ItemsGridLoading() {
  {/* TODO: should add ItemsGrid skeleton */ }
  return (
    <section className="bg-emerald-950 h-full grid place-content-center">
      <BarLoader color="white" />
    </section>
  );
}