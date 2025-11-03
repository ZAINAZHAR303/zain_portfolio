'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Certifications', href: '/certifications' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/ZAINAZHAR303',
      iconSrc: 'https://cdn-icons-png.flaticon.com/512/733/733609.png',
    },
    {
      name: 'Gmail',
      href: 'mailto:zainazhar303@gmail.com',
      iconSrc: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhammad-zain-azhar/',
      iconSrc: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/u/zainazhar2231/',
      iconSrc: 'https://assets.leetcode.com/static_assets/public/images/LeetCode_logo.png',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@MohammadZainAzhar',
      iconSrc: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 shadow-xl flex flex-col p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-lg">
          <Image
            src="/nobg.png"
            alt="Zain Azhar"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Zain Azhar
        </h2>
        <p className="text-gray-600 text-sm mt-1">Developer & Designer</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:transform hover:scale-105'
                  }`}
                >
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide font-semibold">
          Connect
        </p>
        <div className="flex justify-around">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 transform hover:scale-125"
              aria-label={social.name}
              title={social.name}
            >
              <img
                src={social.iconSrc}
                alt={social.name}
                className="h-7 w-7 object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
