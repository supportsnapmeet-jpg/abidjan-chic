'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/carte', label: 'Carte', icon: '🗺️' },
  { href: '/favoris', label: 'Favoris', icon: '❤️' },
  { href: '/admin', label: 'Admin', icon: '⚙️' },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 flex justify-around py-3 pb-6 z-50">
      {NAV.map(n => (
        <Link key={n.href} href={n.href}
          className={`flex flex-col items-center gap-1 ${path === n.href ? 'text-[#F77F00]' : 'text-gray-400'}`}>
          <span className="text-xl">{n.icon}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider">{n.label}</span>
        </Link>
      ))}
    </div>
  );
}