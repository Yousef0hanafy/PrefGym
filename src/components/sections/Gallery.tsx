'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

// Placeholder images using solid colors with gym-related text
const placeholderImages = [
  { id: '1', title: 'Weight Training Area', color: 'from-gray-800 to-gray-900' },
  { id: '2', title: 'Cardio Zone', color: 'from-red-900/50 to-gray-900' },
  { id: '3', title: 'Free Weights Section', color: 'from-gray-700 to-gray-900' },
  { id: '4', title: 'Boxing Ring', color: 'from-red-800/50 to-gray-900' },
  { id: '5', title: 'Spa & Sauna', color: 'from-gray-600 to-gray-900' },
  { id: '6', title: 'Training Studio', color: 'from-gray-800 to-gray-900' },
];

export default function Gallery() {
  const { gallery } = useGymStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayImages = gallery.length > 0 ? gallery : placeholderImages.map((img, index) => ({
    id: img.id,
    url: '',
    title: img.title,
    color: img.color,
  }));

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-red-500">Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take a peek inside our world-class fitness facility
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-800"
              onClick={() => image.url && setSelectedImage(image.url)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${(image as any).color || 'from-gray-800 to-gray-900'} flex items-center justify-center`}>
                <span className="text-gray-500 text-lg font-medium">{image.title}</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
            >
              <img
                src={selectedImage}
                alt="Gallery"
                className="w-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}