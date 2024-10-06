import { HeaderSkeleton, ItemListSkeleton, ItemSkeleton } from "@/app/components/skeletons";

export default function Loading() {
  return (
    <main className="p-4 space-y-3">
      <HeaderSkeleton />
      <ItemListSkeleton size={10} />
    </main>
  );
}