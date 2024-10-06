import Skeleton, { HeaderSkeleton, ItemListSkeleton, ItemSkeleton } from "@/app/components/skeletons";

export default function Loading() {
  return (
    <main className="p-4 space-y-3">
      <HeaderSkeleton />
      <ItemListSkeleton size={10} />
      <div className="flex justify-center">
        <Skeleton className="h-8 w-3/4" />
      </div>
    </main>
  );
}