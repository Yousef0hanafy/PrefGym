'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Users, Award, Square } from 'lucide-react';
import { useGymStore } from '@/store/gym-store';

function Counter({ value, suffix = '', inView }: { value: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
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
  }, [value, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { totalMembers, totalTrainers, premiumSpace } = useGymStore();

  const stats = [
    {
      icon: Users,
      value: totalMembers,
      label: 'Active Members',
      suffix: '+',
    },
    {
      icon: Award,
      value: totalTrainers,
      label: 'Expert Trainers',
      suffix: '',
    },
    {
      icon: Square,
      value: premiumSpace,
      label: 'm² Premium Space',
      suffix: '',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex items-center space-x-4 p-6 rounded-2xl bg-black/50 border border-gray-800"
            >
              <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}