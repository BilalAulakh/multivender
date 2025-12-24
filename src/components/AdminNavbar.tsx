'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function AdminNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <div className="font-bold text-lg">Admin Panel</div>
                <div className="text-xs text-gray-400">MultiMarket</div>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/add-product"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Add Product
              </Link>
              <Link
                href="/admin/products"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/admin/orders"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/admin/users"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Users
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-gray-400">{user?.role}</div>
            </div>

            {/* View Store Button */}
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-md hover:border-gray-500 transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>View Store</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
