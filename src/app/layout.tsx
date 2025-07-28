import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'
import { PublicHeader } from '../app/(public)/PublicHeader';
import { PublicFooter } from './(public)/PublicFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Your one-stop shop for everything',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col ">
            <PublicHeader />
          <main className="flex-1 mx-10">{children}</main>
          <PublicFooter />
        </div>
      </body>
    </html>
  );
}