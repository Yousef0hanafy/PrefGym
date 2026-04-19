'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, AlertCircle, CheckCircle, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-red-500">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gray-900 border border-gray-800"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-red-500 focus:outline-none transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <MapPin className="w-6 h-6 text-red-500 mb-3" />
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-gray-400 text-sm">Cairo, Egypt</p>
              </div>
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <Phone className="w-6 h-6 text-red-500 mb-3" />
                <h4 className="font-semibold mb-1">Phone</h4>
                <p className="text-gray-400 text-sm">+20 111 697 3238</p>
              </div>
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <Mail className="w-6 h-6 text-red-500 mb-3" />
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-gray-400 text-sm">info@performancegym.com</p>
              </div>
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <Clock className="w-6 h-6 text-red-500 mb-3" />
                <h4 className="font-semibold mb-1">Working Hours</h4>
                <p className="text-gray-400 text-sm">All Week: 5AM - 3AM</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d31.2!3d30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-50"
              />
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Performance.gym1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-red-500" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/performance_gym__"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-500 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-red-500" />
                <span>Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}