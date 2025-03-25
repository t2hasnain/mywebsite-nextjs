'use client';

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaImages, FaBlog, FaEnvelope, FaEye } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    blogCount: 0,
    messagesCount: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Count portfolio items
        const portfolioSnapshot = await getDocs(collection(db, 'portfolio'));
        
        // Count blog posts
        const blogSnapshot = await getDocs(collection(db, 'blog'));
        
        // Count messages
        const messagesSnapshot = await getDocs(collection(db, 'messages'));
        
        setStats({
          portfolioCount: portfolioSnapshot.size,
          blogCount: blogSnapshot.size,
          messagesCount: messagesSnapshot.size,
        });
        
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portfolio Stats */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Portfolio Items</p>
                  <h3 className="text-3xl font-bold mt-1 dark:text-white">{stats.portfolioCount}</h3>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <FaImages className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </div>
              </div>
              <Link href="/admin/portfolio" className="text-indigo-600 dark:text-indigo-400 text-sm mt-4 inline-block hover:underline">
                View all portfolio items
              </Link>
            </div>
            
            {/* Blog Stats */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Blog Posts</p>
                  <h3 className="text-3xl font-bold mt-1 dark:text-white">{stats.blogCount}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <FaBlog className="text-green-600 dark:text-green-400 text-xl" />
                </div>
              </div>
              <Link href="/admin/blog" className="text-green-600 dark:text-green-400 text-sm mt-4 inline-block hover:underline">
                View all blog posts
              </Link>
            </div>
            
            {/* Messages Stats */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Messages</p>
                  <h3 className="text-3xl font-bold mt-1 dark:text-white">{stats.messagesCount}</h3>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <FaEnvelope className="text-purple-600 dark:text-purple-400 text-xl" />
                </div>
              </div>
              <Link href="/admin/messages" className="text-purple-600 dark:text-purple-400 text-sm mt-4 inline-block hover:underline">
                View all messages
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                href="/admin/portfolio/new" 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center space-x-3"
              >
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                  <FaImages className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="dark:text-white">Add Portfolio Item</span>
              </Link>
              
              <Link 
                href="/admin/blog/new" 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center space-x-3"
              >
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <FaBlog className="text-green-600 dark:text-green-400" />
                </div>
                <span className="dark:text-white">Create Blog Post</span>
              </Link>
              
              <Link 
                href="/" 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center space-x-3"
                target="_blank"
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <FaEye className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="dark:text-white">View Website</span>
              </Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Recent Activity</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Connect your firebase account to display recent activity.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 