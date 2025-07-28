// components/public/PublicFooter.tsx
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-gray-50 border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MiniStore. All rights reserved.
          </p>
          
          {/* Minimal social links */}
          <div className="flex gap-4">
            <Link 
              href="https://twitter.com" 
              target="_blank"
              className="text-gray-400 hover:text-gray-600"
            >
              <Twitter size={18} />
            </Link>
            <Link 
              href="https://github.com" 
              target="_blank"
              className="text-gray-400 hover:text-gray-600"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}