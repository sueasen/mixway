'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: '駅探索', href: '/demo/station' },
  { name: '経路探索', href: '/demo/course' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center w-full mb-4">
      {links.map((link) => {
        let className =
          'h-10 items-center p-2 bg-gray-400 text-white flex-1 text-center hover:bg-gray-600 ';
        if (pathname === link.href) {
          className += ' bg-gray-900';
        }
        return (
          <Link key={link.name} href={link.href} className={className}>
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
