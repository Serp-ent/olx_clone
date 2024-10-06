export function ItemSkeleton() {
  return (
    <div className="bg-white flex h-24 justify-between shadow border rounded-md p-2 gap-4 animate-pulse">
      <div className="flex items-center gap-2 grow">
        <div className="border-2 rounded-md aspect-square relative h-full bg-gray-300"></div>

        <div className="grow">
          <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        </div>
      </div>

      <div className="text-2xl grid items-center pr-2">
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}

export function ItemListSkeleton({ size }: { size: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: size }).map((_, index) => (
        <ItemSkeleton key={index} />
      ))}
    </div>
  );
}

export function HeaderSkeleton({ size = 'large' }: { size?: 'small' | 'medium' | 'large' }) {
  let heightClass = '';

  switch (size) {
    case 'small':
      heightClass = 'h-4';
      break;
    case 'medium':
      heightClass = 'h-6';
      break;
    case 'large':
      heightClass = 'h-8';
      break;
  }

  return (
    <div className={`bg-white rounded w-2/3 ${heightClass} animate-pulse`}></div>
  );
}

export default function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse bg-white rounded ${className}`}
    >
    </div>
  );
}