'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

export default function GalleryPage() {
  const { gallery, addGalleryImage, deleteGalleryImage } = useGymStore();
  const [newImage, setNewImage] = useState({ url: '', title: '' });

  // Default placeholder images
  const placeholderImages = [
    { id: '1', url: '', title: 'Weight Training Area' },
    { id: '2', url: '', title: 'Cardio Zone' },
    { id: '3', url: '', title: 'Free Weights Section' },
    { id: '4', url: '', title: 'Boxing Ring' },
    { id: '5', url: '', title: 'Spa & Sauna' },
    { id: '6', url: '', title: 'Training Studio' },
  ];

  const displayImages = gallery.length > 0 ? gallery : placeholderImages;

  const handleAddImage = () => {
    if (newImage.url && newImage.title) {
      addGalleryImage({
        id: Date.now().toString(),
        url: newImage.url,
        title: newImage.title,
      });
      setNewImage({ url: '', title: '' });
    }
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <p className="text-gray-400">Manage your gym gallery images</p>
      </div>

      {/* Add Image Form */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Add New Image</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Image URL"
            value={newImage.url}
            onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
            className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Title"
            value={newImage.title}
            onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
            className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none"
          />
          <button
            onClick={handleAddImage}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group rounded-2xl overflow-hidden bg-gray-900 border border-gray-800"
          >
            {image.url ? (
              <img
                src={image.url}
                alt={image.title}
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">{image.title}</span>
              </div>
            )}
            
            <div className="p-4">
              <h3 className="font-semibold">{image.title}</h3>
            </div>

            {image.url && (
              <button
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}