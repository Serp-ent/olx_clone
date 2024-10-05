'use client';


// TODO: optimize some parts of it for server
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function Pagination({ totalPages, limit }: {
  totalPages: number,
  limit: number,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  return (
    <>
      <div className='flex'>
        <PaginationArrow
          direction='left'
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className='flex -space-x-px'>
          {allPages.map((page, index) => {
            let position:
              | 'first'
              | 'last'
              | 'single'
              | 'middle'
              | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction='right'
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  // Set default classes
  let className = 'flex h-8 aspect-square items-center justify-center text-sm border';

  // Conditionally add classes
  if (position === 'first' || position === 'single') {
    className += ' rounded-l-md';
  }
  if (position === 'last' || position === 'single') {
    className += ' rounded-r-md';
  }
  if (isActive) {
    className += ' z-10 bg-blue-600 border-blue-600 text-white';
  } else {
    if (position !== 'middle') {
      className += ' hover:bg-gray-100';
    }
    if (position === 'middle') {
      className += ' text-gray-300';
    }
  }

  // Render component based on isActive or position
  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  let className = 'flex h-8 aspect-square items-center justify-center rounded-md border';

  if (isDisabled) {
    className += ' pointer-events-none text-gray-300';
  } else {
    className += ' hover:bg-gray-100';
  }

  if (direction === 'left') {
    className += ' mr-2 md:mr-4';
  } else if (direction === 'right') {
    className += ' ml-2 md:ml-4';
  }

  const icon =
    direction === 'left' ? (
      <BsArrowLeft className='w-4' />
    ) : (
      <BsArrowRight className='w-4' />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};