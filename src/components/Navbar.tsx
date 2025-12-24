'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  if (pathname === '/register' || pathname?.startsWith('/admin')) return null;


  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📞 +1-234-567-8900</span>
            <span className="hidden md:block">|</span>
            <span className="hidden md:block">Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/help" className="hover:text-gray-300">Help jj  qj</Link>
            <span>|</span>
            <Link href="/track" className="hover:text-gray-300">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-gray-900">MultiMarket</div>
                <div className="text-xs text-gray-500">Shop Everything</div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-6">
              <Link href="/account" className="hidden md:flex flex-col items-center text-gray-700 hover:text-blue-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs mt-1">Account</span>
              </Link>
              
              <Link href="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-blue-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
                <span className="text-xs mt-1">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3 overflow-x-auto">
              <Link href="/categories" className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">All Categories</Link>
              <Link href="/deals" className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Today's Deals</Link>
              <Link href="/electronics" className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Electronics</Link>
              <Link href="/fashion" className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Fashion</Link>
              <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Home & Garden</Link>
              <Link href="/sports" className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Sports & Outdoors</Link>
              <Link href="/vendor" className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Become a Vendor</Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
