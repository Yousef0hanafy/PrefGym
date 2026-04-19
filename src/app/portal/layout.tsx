'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, User, LogOut, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';
import { useDemoView } from '@/components/providers/DemoProvider';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setCurrentView } = useDemoView();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const portalLinks = [
    { name: 'Dashboard', href: '/portal', icon: Home },
    { name: 'Profile', href: '/portal/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-white">Member Portal</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-40 transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">PERFORMANCE<span className="text-red-500"> جym</span></span>
          </Link>
          <p className="text-gray-500 text-sm mt-1">Member Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {portalLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Back to Landing</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-8">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}