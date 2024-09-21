// TODO: add filled icons for chosen item
// TODO: this footer should appear only when user scrolls up
import Link from "next/link";
import { BsHouse, BsHeart, BsPlusCircle, BsPerson, BsChat } from "react-icons/bs";


export default function Footer() {
  const cards = [
    {
      title: 'Search',
      icon: <BsHouse size={18} />,
      href: "/search"
    },
    {
      title: 'Observed',
      icon: <BsHeart size={18} />,
      href: "/observed"
    },
    {
      title: 'Add',
      icon: <BsPlusCircle size={18} />,
      href: '/add'
    },
    {
      title: 'Messages',
      icon: <BsChat size={18} />,
      href: '/messages',
    },
    {
      title: 'Account',
      icon: <BsPerson size={18} />,
      href: '/profile'
    },
  ];

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
              {item.icon}
              <h3>{item.title}</h3>
            </Link>
          </li>
        )}
      </ul>
    </footer >
  );
}