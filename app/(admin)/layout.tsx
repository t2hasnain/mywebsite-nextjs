'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaHome, FaImages, FaBlog, FaUsers, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="bg-indigo-800 text-white w-64 flex-shrink-0 shadow-lg">
        <div className="p-4 border-b border-indigo-700">
          <h2 className="text-xl font-bold">T2Hasnain Admin</h2>
        </div>
        <nav className="mt-5">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin"
                className={`flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors ${
                  pathname === '/admin' ? 'bg-indigo-700' : ''
                }`}
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/portfolio"
                className={`flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors ${
                  pathname?.includes('/admin/portfolio') ? 'bg-indigo-700' : ''
                }`}
              >
                <FaImages className="mr-3" />
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/blog"
                className={`flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors ${
                  pathname?.includes('/admin/blog') ? 'bg-indigo-700' : ''
                }`}
              >
                <FaBlog className="mr-3" />
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/messages"
                className={`flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors ${
                  pathname?.includes('/admin/messages') ? 'bg-indigo-700' : ''
                }`}
              >
                <FaUsers className="mr-3" />
                Messages
              </Link>
            </li>
            <li className="border-t border-indigo-700 mt-4 pt-4">
              <Link 
                href="/"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors"
              >
                <FaHome className="mr-3" />
                Visit Site
              </Link>
            </li>
            <li>
              <button 
                onClick={handleSignOut}
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors w-full text-left"
              >
                <FaSignOutAlt className="mr-3" />
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  ) : null;
} 