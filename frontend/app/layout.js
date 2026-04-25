import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from "next/link";

export const metadata = {
  title: 'Gamified Task App',
  description: 'Neon-powered productivity with rewards and Soroban wallet integration'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">

        <Toaster position="top-right" />

        {/* ✅ PAGE CONTENT */}
        <div className="p-4">
          {children}
        </div>

      </body>
    </html>
  );
}