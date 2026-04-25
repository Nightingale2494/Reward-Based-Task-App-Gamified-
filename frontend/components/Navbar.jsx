'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['Dashboard', '/dashboard'],
  ['Tasks', '/tasks'],
  ['Leaderboard', '/leaderboard'],
  ['Rewards', '/rewards'],
  ['Profile', '/profile']
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 bg-bg/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap ${
              pathname === href ? 'bg-violet text-white' : 'bg-white/5 text-white/70'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
