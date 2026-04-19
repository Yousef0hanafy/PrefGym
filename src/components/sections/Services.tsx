'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Box, Sparkles, UserCheck, Stethoscope, Activity } from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: 'Gym Equipment',
    description: 'State-of-the-art machines and free weights for all your training needs.',
  },
  {
    icon: Box,
    title: 'Kickboxing',
    description: 'Professional kickboxing training with expert coaches.',
  },
  {
    icon: Sparkles,
    title: 'Spa Access',
    description: 'Relax and recover with our premium spa facilities.',
  },
  {
    icon: UserCheck,
    title: 'Personal Training',
    description: 'One-on-one sessions with certified personal trainers.',
  },
  {
    icon: Stethoscope,
    title: 'Physiotherapy',
    description: 'Expert physiotherapy services for injury recovery.',
  },
  {
    icon: Activity,
    title: 'Body Assessment',
    description: 'Comprehensive body analysis and fitness assessments.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-red-500">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to achieve your fitness goals under one roof
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-red-500/50 transition-all hover:transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <service.icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
