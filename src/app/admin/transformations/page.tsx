'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Upload } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

export default function TransformationsPage() {
  const { transformations, addTransformation, deleteTransformation } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    beforeImage: '',
    afterImage: '',
  });

  const placeholderData = [
    { id: '1', title: 'Ahmed M.', description: 'Lost 15kg in 6 months', beforeImage: '', afterImage: '' },
    { id: '2', title: 'Sarah K.', description: 'Muscle gain transformation', beforeImage: '', afterImage: '' },
    { id: '3', title: 'Omar H.', description: 'Complete body transformation', beforeImage: '', afterImage: '' },
  ];

  const displayData = transformations.length > 0 ? transformations : placeholderData;

  const handleAdd = () => {
    if (formData.title && formData.description) {
      addTransformation({ id: Date.now().toString(), ...formData });
      setFormData({ title: '', description: '', beforeImage: '', afterImage: '' });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this transformation?')) deleteTransformation(id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transformations</h1>
          <p className="text-gray-400">Manage before/after transformations</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          <Plus className="w-5 h-5" /><span>Add</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="relative group rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
            <div className="grid grid-cols-2 gap-1">
              <div className="aspect-square bg-gray-800 flex items-center justify-center"><span className="text-gray-600 text-sm">Before</span></div>
              <div className="aspect-square bg-gray-800 flex items-center justify-center"><span className="text-gray-600 text-sm">After</span></div>
            </div>
            <div className="p-4"><h3 className="font-semibold">{t.title}</h3><p className="text-gray-400 text-sm mt-1">{t.description}</p></div>
            <button onClick={() => handleDelete(t.id)} className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Add Transformation</h2><button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button></div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-2">Title</label><input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500" placeholder="Member name" /></div>
                <div><label className="block text-sm font-medium mb-2">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-2">Before Image URL</label><input type="url" value={formData.beforeImage} onChange={e => setFormData({...formData, beforeImage: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500" /></div>
                  <div><label className="block text-sm font-medium mb-2">After Image URL</label><input type="url" value={formData.afterImage} onChange={e => setFormData({...formData, afterImage: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500" /></div>
                </div>
                <button onClick={handleAdd} className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600">Add Transformation</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}