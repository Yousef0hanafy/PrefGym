'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { testimonials } = useGymStore();

  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      name: 'Ahmed Mohamed',
      plan: 'Annual',
      rating: 5,
      avatar: '',
      text: 'Best gym in Egypt! Amazing equipment and professional trainers. Highly recommended!',
    },
    {
      id: '2',
      name: 'Sarah Ahmed',
      plan: 'Semi-Annual',
      rating: 5,
      avatar: '',
      text: 'The spa facilities are incredible. Love the atmosphere and the community here.',
    },
    {
      id: '3',
      name: 'Omar Khalil',
      plan: 'Quarter',
      rating: 4,
      avatar: '',
      text: 'Great environment and excellent personal training sessions. Results speak for themselves!',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-red-500">Members Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied members who transformed their lives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-black border border-gray-800 hover:border-red-500/30 transition-all"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 font-bold text-lg">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.plan} Member</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-gray-300 mt-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}