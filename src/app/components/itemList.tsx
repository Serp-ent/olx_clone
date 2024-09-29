import db from '@/app/lib/prisma'
import Item from './item';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import EmptyList from './emptyList';
import { auth } from '../auth';
import type { Item as ItemType, ProductImage } from '@prisma/client';

// TODO: this one type should be in one file
type ItemWithPhoto = ItemType &
{
  images: ProductImage[],
  isFavorite: boolean,
}

export default async function ItemsList({ items }: { items: ItemWithPhoto[] }) {
  if (items.length === 0) {
    return <EmptyList />;
  }

  return (
    <ul className='space-y-1'>
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  );
}