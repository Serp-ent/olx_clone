// TODO: add filled icons for chosen item
// TODO: this footer should appear only when user scrolls up

'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsHouse, BsHouseFill,
  BsHeart, BsHeartFill,
  BsPlusCircle, BsPlusCircleFill,
  BsPerson, BsPersonFill,
  BsChat, BsChatFill,
} from "react-icons/bs";

const cards = [
  {
    title: 'Search',
    icon: <BsHouse size={18} />,
    activeIcon: <BsHouseFill size={18} />,
    href: "/"
  },
  {
    title: 'Observed',
    icon: <BsHeart size={18} />,
    activeIcon: <BsHeartFill size={18} />,
    href: "/observed"
  },
  {
    title: 'Add',
    icon: <BsPlusCircle size={18} />,
    activeIcon: <BsPlusCircleFill size={18} />,
    href: '/add'
  },
  {
    title: 'Messages',
    icon: <BsChat size={18} />,
    activeIcon: <BsChatFill size={18} />,
    href: '/messages',
  },
  {
    title: 'Account',
    icon: <BsPerson size={18} />,
    activeIcon: <BsPersonFill size={18} />,
    href: '/profile'
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="py-1 pt-2 px-4 bg-zinc-900">
      <ul className="flex justify-between">
        {cards.map((item, i) =>
          <li
            key={i}
            className="text-xs"
          >
            <Link
              href={item.href}
              className="flex flex-col justify-center items-center gap-1"
            >
              {(pathname === item.href)
                ? <span>{item.activeIcon}</span>
                : <span>{item.icon}</span>
              }
              <h3>{item.title}</h3>
            </Link>
          </li>
        )}
      </ul>
    </footer >
  );
}