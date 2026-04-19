'use client';

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Transformations from '@/components/sections/Transformations';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Booking from '@/components/sections/Booking';
import Contact from '@/components/sections/Contact';
import { Plan } from '@/store/gym-store';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <Transformations />
      <Testimonials />
      <Pricing onPlanSelect={setSelectedPlan} />
      <Booking selectedPlan={selectedPlan} />
      <Contact />
    </main>
  );
}