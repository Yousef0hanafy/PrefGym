'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell, ChevronDown } from 'lucide-react';
import { useDemoView } from '@/components/providers/DemoProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentView, setCurrentView } = useDemoView();
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/#home" className="flex items-center space-x-2">
            <Dumbbell className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">PERFORMANCE<span className="text-red-500"> جym</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side - Demo Switcher + CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm">Demo: {currentView.charAt(0).toUpperCase() + currentView.slice(1)}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {demoMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                  >
                    <button
                      onClick={() => { setCurrentView('landing'); setDemoMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${currentView === 'landing' ? 'text-red-500' : ''}`}
                    >
                      Landing
                    </button>
                    <button
                      onClick={() => { setCurrentView('admin'); setDemoMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${currentView === 'admin' ? 'text-red-500' : ''}`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => { setCurrentView('portal'); setDemoMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${currentView === 'portal' ? 'text-red-500' : ''}`}
                    >
                      Portal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <a
              href="#pricing"
              className="px-6 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-lg rounded-lg mb-4 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-red-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-500 mb-2">Demo View:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentView('landing')}
                      className={`px-3 py-1 rounded ${currentView === 'landing' ? 'bg-red-500' : 'bg-gray-800'}`}
                    >
                      Landing
                    </button>
                    <button
                      onClick={() => setCurrentView('admin')}
                      className={`px-3 py-1 rounded ${currentView === 'admin' ? 'bg-red-500' : 'bg-gray-800'}`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => setCurrentView('portal')}
                      className={`px-3 py-1 rounded ${currentView === 'portal' ? 'bg-red-500' : 'bg-gray-800'}`}
                    >
                      Portal
                    </button>
                  </div>
                </div>
                <a
                  href="#pricing"
                  className="block w-full text-center px-6 py-2.5 bg-red-500 text-white font-semibold rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Join Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}