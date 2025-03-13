'use client';
import Link from 'next/link';

const divisions = [
  { name: 'SkyForge Creative Studios', path: '/divisions/skyforge', color: 'text-purple-500' },
  { name: 'Lumina Creative Media', path: '/divisions/lumina', color: 'text-yellow-400' },
  { name: 'Nexus TechWorks', path: '/divisions/nexus', color: 'text-green-400' },
  { name: 'Horizon Aerial & Visual', path: '/divisions/horizon', color: 'text-blue-300' },
  { name: 'Vespera Publishing', path: '/divisions/vespera', color: 'text-red-400' },
  { name: 'Summit Learning', path: '/divisions/summit', color: 'text-green-600' },
  { name: 'EchoVerse Audio', path: '/divisions/echoverse', color: 'text-pink-500' }
];

const Navbar = () => (
  <nav className='bg-black p-4 flex justify-between items-center shadow-lg border-b border-gray-800'>
    <h1 className='text-xl text-cyan-400 font-bold'>AeroVista</h1>
    <div className='flex gap-4'>
      <Link href='/' className='text-blue-400 hover:opacity-75 transition'>Home</Link>
      {divisions.map(div => (
        <Link key={div.path} href={div.path} className={`${div.color} hover:opacity-75 transition`}>{div.name}</Link>
      ))}
    </div>
  </nav>
);

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
