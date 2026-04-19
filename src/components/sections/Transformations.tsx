'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

const placeholderTransformations = [
  {
    id: '1',
    title: 'Ahmed M.',
    description: 'Lost 15kg in 6 months - Incredible transformation!',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '2',
    title: 'Sarah K.',
    description: 'Muscle gain and body reshaping journey',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '3',
    title: 'Omar H.',
    description: 'Complete body transformation - 12 months',
    beforeImage: '',
    afterImage: '',
  },
];

function BeforeAfterSlider({ transformation }: { transformation: typeof placeholderTransformations[0] }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div
      ref={sliderRef}
      className="relative aspect-square rounded-xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={(e) => isDragging && handleMove(e)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={(e) => isDragging && handleMove(e)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Before */}
      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
        <span className="text-gray-600 font-bold text-xl">BEFORE</span>
      </div>
      
      {/* After */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-gray-900 flex items-center justify-center">
          <span className="text-red-400 font-bold text-xl">AFTER</span>
        </div>
      </div>
      
      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-red-500 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-white" />
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Labels */}
      <span className="absolute bottom-4 left-4 px-2 py-1 bg-black/70 rounded text-xs text-white font-medium">Before</span>
      <span className="absolute bottom-4 right-4 px-2 py-1 bg-red-500/70 rounded text-xs text-white font-medium">After</span>
    </div>
  );
}

export default function Transformations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { transformations } = useGymStore();

  const displayData = transformations.length > 0 ? transformations : placeholderTransformations;

  return (
    <section id="transformations" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real <span className="text-red-500">Transformations</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See the amazing results our members have achieved
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
            >
              <BeforeAfterSlider transformation={t} />
              <div className="p-6">
                <h3 className="text-lg font-bold">{t.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}