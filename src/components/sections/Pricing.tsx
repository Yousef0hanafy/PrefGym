'use client';

import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';
import { useGymStore, Plan } from '@/store/gym-store';

interface PricingProps {
  onPlanSelect?: (plan: Plan) => void;
}

export default function Pricing({ onPlanSelect }: PricingProps) {
  const { memberships } = useGymStore();

  const handlePlanClick = (plan: Plan) => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Call the callback to pre-select the plan
    onPlanSelect?.(plan);
  };

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Membership <span className="text-red-500">Plans</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan to achieve your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberships.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all hover:transform hover:-translate-y-1 ${
                plan.isFeatured
                  ? 'bg-gray-900 border-red-500 shadow-lg shadow-red-500/20'
                  : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center space-x-1 px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    <Crown className="w-3 h-3" />
                    <span>MOST POPULAR</span>
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500 ml-1">L.E</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{plan.duration}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.isFeatured
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'border border-gray-700 text-white hover:border-red-500 hover:text-red-500'
                }`}
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}