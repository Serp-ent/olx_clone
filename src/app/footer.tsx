'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If the user scrolls down, hide the footer; if they scroll up, show it
      if (currentScrollY > lastScrollY) {
        setShowFooter(false); // Scrolling down
      } else {
        setShowFooter(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // TODO: if window is not scrollable it should be shown all the time

  return (
    <footer className={`fixed w-screen bg-white bottom-0 py-1 pt-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] transform transition-transform duration-300 ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}>
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