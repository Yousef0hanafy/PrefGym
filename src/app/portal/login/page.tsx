'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dumbbell, AlertCircle, User, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PortalLogin() {
  const router = useRouter();
  const [memberId, setMemberId] = useState('');
  const [phoneLast4, setPhoneLast4] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo validation - in production, validate against database
    if (memberId && phoneLast4.length === 4) {
      // Store session (demo only)
      sessionStorage.setItem('memberId', memberId);
      router.push('/portal');
    } else {
      setError('Please enter a valid member ID and 4-digit phone number');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Dumbbell className="w-10 h-10 text-red-500" />
            <span className="text-2xl font-bold">PERFORMANCE<span className="text-red-500"> جym</span></span>
          </Link>
          <p className="text-gray-400 mt-2">Member Portal Login</p>
        </div>

        {/* Login Form */}
        <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-500 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Member ID</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="Enter your member ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Last 4 Digits of Phone</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={phoneLast4}
                  onChange={(e) => setPhoneLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="****"
                  maxLength={4}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Demo: Use any member ID and 4 digits
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <a href="/#home" className="text-gray-400 hover:text-red-500 transition-colors">
            ← Back to Home
          </a>
        </p>
      </motion.div>
    </div>
  );
}