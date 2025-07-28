// app/(public)/success/page.tsx
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="max-w-md mx-4 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">
              Continue Shopping
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/orders">
              View Orders
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}