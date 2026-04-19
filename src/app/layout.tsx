import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DemoProvider } from '@/components/providers/DemoProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Performance Gym - Transform Your Body',
  description: 'Premium fitness center with world-class equipment and trainers in Egypt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <DemoProvider>
            <Navbar />
            {children}
            <Footer />
          </DemoProvider>
        </Providers>
      </body>
    </html>
  );
}