'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Calendar, Clock, AlertTriangle, Snowflake, CheckCircle } from 'lucide-react';

export default function PortalDashboard() {
  // Demo member data
  const member = {
    name: 'Ahmed Mohamed',
    memberId: 'PG-2024-001',
    plan: 'Annual',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    daysRemaining: 347,
    freezeStatus: 'none' as const,
    invitations: 28,
    invitationsUsed: 15,
    ptSessions: 5,
    ptSessionsUsed: 2,
    freezesLeft: 12,
  };

  const isExpiringSoon = member.daysRemaining < 30;
  const isDangerLow = member.daysRemaining < 7;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {member.name}!</h1>
          <p className="text-gray-400">Member ID: {member.memberId}</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
          <span className="text-red-500 font-semibold">{member.plan} Plan</span>
        </div>
      </div>

      {/* Warning Banner */}
      {isDangerLow && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 rounded-xl bg-red-500/20 border border-red-500"
        >
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <div>
            <p className="font-semibold text-red-500">Urgent: Membership Expiring Soon!</p>
            <p className="text-sm text-red-400">Only {member.daysRemaining} days remaining. Renew now to avoid interruption.</p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Days Remaining */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl border ${isExpiringSoon ? 'bg-red-500/10 border-red-500' : 'bg-gray-900 border-gray-800'}`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-xl ${isExpiringSoon ? 'bg-red-500/20' : 'bg-blue-500/20'} flex items-center justify-center`}>
              <Calendar className={`w-6 h-6 ${isExpiringSoon ? 'text-red-500' : 'text-blue-500'}`} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{member.daysRemaining}</div>
          <div className={`text-sm ${isExpiringSoon ? 'text-red-400' : 'text-gray-400'}`}>Days Remaining</div>
        </motion.div>

        {/* Membership Period */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="text-lg font-semibold">{member.startDate} → {member.endDate}</div>
          <div className="text-sm text-gray-400">Membership Period</div>
        </motion.div>

        {/* Freeze Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            {(member.freezeStatus === 'frozen' || member.freezeStatus === 'active') && <Snowflake />}
            {(member.freezeStatus === 'none') && <CheckCircle />}
          </div>
          <div className="text-lg font-semibold capitalize">{member.freezeStatus === 'none' ? 'Active' : member.freezeStatus}</div>
          <div className="text-sm text-gray-400">{member.freezesLeft} Freezes Left</div>
        </motion.div>

        {/* Invitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="text-lg font-semibold">{member.invitations - member.invitationsUsed} / {member.invitations}</div>
          <div className="text-sm text-gray-400">Invitations Left</div>
        </motion.div>
      </div>

      {/* Usage Overview */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold mb-6">Usage Overview</h2>
        <div className="space-y-6">
          {/* Invitations Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Invitations</span>
              <span className="text-gray-400">{member.invitationsUsed} used of {member.invitations}</span>
            </div>
            <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all"
                style={{ width: `${(member.invitationsUsed / member.invitations) * 100}%` }}
              />
            </div>
          </div>

          {/* PT Sessions Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Personal Training Sessions</span>
              <span className="text-gray-400">{member.ptSessionsUsed} used of {member.ptSessions}</span>
            </div>
            <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(member.ptSessionsUsed / member.ptSessions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors text-left">
          <h3 className="font-semibold mb-2">Renew Membership</h3>
          <p className="text-gray-400 text-sm">Extend your membership period</p>
        </button>
        <button className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors text-left">
          <h3 className="font-semibold mb-2">Freeze Account</h3>
          <p className="text-gray-400 text-sm">Pause your membership temporarily</p>
        </button>
        <button className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors text-left">
          <h3 className="font-semibold mb-2">Book PT Session</h3>
          <p className="text-gray-400 text-sm">Schedule a personal training session</p>
        </button>
      </div>
    </div>
  );
}
