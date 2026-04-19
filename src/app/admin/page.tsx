'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { totalMembers, totalTrainers, premiumSpace, expiringSoon, revenue, members, bookings } = useGymStore();

  const stats = [
    {
      title: 'Total Active Members',
      value: totalMembers,
      icon: Users,
      color: 'bg-blue-500/20 text-blue-500',
    },
    {
      title: 'Total Trainees',
      value: totalTrainers,
      icon: TrendingUp,
      color: 'bg-green-500/20 text-green-500',
    },
    {
      title: 'Subscriptions Expiring',
      value: expiringSoon,
      icon: AlertTriangle,
      color: 'bg-yellow-500/20 text-yellow-500',
    },
    {
      title: 'Revenue (L.E)',
      value: revenue,
      icon: CreditCard,
      color: 'bg-red-500/20 text-red-500',
    },
  ];

  const recentBookings = [
    { id: '1', name: 'Ahmed Mohamed', plan: 'Annual', phone: '01234567890', date: '2024-01-15' },
    { id: '2', name: 'Sarah Ahmed', plan: 'Semi-Annual', phone: '01112223334', date: '2024-01-14' },
    { id: '3', name: 'Omar Khalil', plan: 'Quarter', phone: '01556667778', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here&apos;s your gym overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-gray-400 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold mb-6">Recent Membership Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 text-gray-400 font-medium">Name</th>
                <th className="text-left py-3 text-gray-400 font-medium">Plan</th>
                <th className="text-left py-3 text-gray-400 font-medium">Phone</th>
                <th className="text-left py-3 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-800/50">
                  <td className="py-4">{booking.name}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-sm">
                      {booking.plan}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{booking.phone}</td>
                  <td className="py-4 text-gray-400">{booking.date}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 text-sm">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.a
          href="/admin/plans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors cursor-pointer"
        >
          <h3 className="font-semibold mb-2">Manage Plans</h3>
          <p className="text-gray-400 text-sm">Add, edit, or remove membership plans</p>
        </motion.a>
        <motion.a
          href="/admin/gallery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors cursor-pointer"
        >
          <h3 className="font-semibold mb-2">Manage Gallery</h3>
          <p className="text-gray-400 text-sm">Add or remove gym photos</p>
        </motion.a>
        <motion.a
          href="/admin/transformations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors cursor-pointer"
        >
          <h3 className="font-semibold mb-2">Manage Transformations</h3>
          <p className="text-gray-400 text-sm">Add before/after transformations</p>
        </motion.a>
      </div>
    </div>
  );
}