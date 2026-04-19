'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGymStore, Plan } from '@/store/gym-store';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(11, 'Phone must be 11 digits').max(11),
  email: z.string().email('Invalid email address'),
  plan: z.string().min(1, 'Please select a plan'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const WHATSAPP_NUMBER = '201116973238';

interface BookingProps {
  selectedPlan?: Plan | null;
}

export default function Booking({ selectedPlan }: BookingProps) {
  const { memberships, addBooking } = useGymStore();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      plan: '',
    },
  });

  useEffect(() => {
    if (selectedPlan) {
      setSelectedPlanId(selectedPlan.id);
      setValue('plan', selectedPlan.name);
    }
  }, [selectedPlan, setValue]);

  const onSubmit = (data: BookingFormData) => {
    // Add booking to store
    addBooking({
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      plan: data.plan,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);

    // Prepare WhatsApp message
    const planDetails = memberships.find(p => p.name === data.plan);
    const message = `*New Membership Request*\n\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n*Email:* ${data.email}\n*Selected Plan:* ${data.plan}\n*Price:* ${planDetails?.price || 'N/A'} L.E\n\nPlease contact me to complete the registration!`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <section id="booking" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your <span className="text-red-500">Membership</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fill in your details and we&apos;ll contact you shortly
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-black border border-gray-800"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Success!</h3>
                <p className="text-gray-400">
                  Your membership request has been sent. Our team will contact you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Membership Plan</label>
                  <select
                    {...register('plan')}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                    value={selectedPlanId}
                    onChange={(e) => {
                      const plan = memberships.find(p => p.id === e.target.value);
                      if (plan) {
                        setSelectedPlanId(plan.id);
                        setValue('plan', plan.name);
                      }
                    }}
                  >
                    <option value="">Select a plan</option>
                    {memberships.map((plan) => (
                      <option key={plan.id} value={plan.name}>
                        {plan.name} - {plan.price.toLocaleString()} L.E ({plan.duration})
                      </option>
                    ))}
                  </select>
                  {errors.plan && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.plan.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Request</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}