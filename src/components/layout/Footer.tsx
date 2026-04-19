import Link from 'next/link';
import { Instagram, Dumbbell, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">PERFORMANCE<span className="text-red-500"> جym</span></span>
            </Link>
            <p className="text-gray-400">
              Transform your body with Egypt&apos;s premier fitness destination. 
              State-of-the-art equipment, expert trainers, and premium facilities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Performance.gym1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/performance_gym__"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-red-500 transition-colors">Gallery</a></li>
              <li><a href="#transformations" className="text-gray-400 hover:text-red-500 transition-colors">Transformations</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-red-500 transition-colors">Pricing</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Gym Equipment</li>
              <li className="text-gray-400">Personal Training</li>
              <li className="text-gray-400">Kickboxing</li>
              <li className="text-gray-400">Physiotherapy</li>
              <li className="text-gray-400">Spa & Recovery</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                <span>Cairo, Egypt</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-500" />
                <span>+20 111 697 3238</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-red-500" />
                <span>info@performancegym.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p>All Week</p>
                  <p>5:00 AM → 3:00 AM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Performance Gym. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Developed by <span className="text-red-500 font-semibold">Yousef Hanafy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}