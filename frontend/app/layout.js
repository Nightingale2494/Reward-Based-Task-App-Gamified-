import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Gamified Task App',
  description: 'Neon-powered productivity with rewards and Soroban wallet integration'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
