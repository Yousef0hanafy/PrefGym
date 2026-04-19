'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Crown, X, Check } from 'lucide-react';
import { useGymStore, Plan } from '@/store/gym-store';

export default function PlansPage() {
  const { memberships, addMembership, updateMembership, deleteMembership, setFeaturedPlan } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    features: '',
    isFeatured: false,
  });

  const openModal = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        price: plan.price.toString(),
        duration: plan.duration,
        features: plan.features.join('\n'),
        isFeatured: plan.isFeatured,
      });
    } else {
      setEditingPlan(null);
      setFormData({ name: '', price: '', duration: '', features: '', isFeatured: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = formData.features.split('\n').filter(f => f.trim());
    
    if (editingPlan) {
      updateMembership(editingPlan.id, {
        name: formData.name,
        price: parseInt(formData.price),
        duration: formData.duration,
        features,
        isFeatured: formData.isFeatured,
      });
    } else {
      addMembership({
        id: Date.now().toString(),
        name: formData.name,
        price: parseInt(formData.price),
        duration: formData.duration,
        features,
        isFeatured: formData.isFeatured,
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      deleteMembership(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Membership Plans</h1>
          <p className="text-gray-400">Manage your membership plans and pricing</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Plan</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-2xl bg-gray-900 border transition-all ${
              plan.isFeatured ? 'border-red-500' : 'border-gray-800'
            }`}
          >
            {plan.isFeatured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  <Crown className="w-3 h-3" />
                  <span>FEATURED</span>
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(plan)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-red-500/20 transition-colors text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
              <span className="text-gray-500 ml-1">L.E</span>
              <span className="text-gray-500 text-sm ml-2">/ {plan.duration}</span>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setFeaturedPlan(plan.id)}
              className={`w-full py-2 rounded-lg border transition-colors ${
                plan.isFeatured
                  ? 'border-red-500 text-red-500'
                  : 'border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500'
              }`}
            >
              {plan.isFeatured ? 'Featured' : 'Set as Featured'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingPlan ? 'Edit Plan' : 'Add New Plan'}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Plan Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (L.E)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 1 Month"
                      className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-700 bg-black text-red-500 focus:ring-red-500"
                  />
                  <span>Set as featured plan</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                >
                  {editingPlan ? 'Update Plan' : 'Add Plan'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}