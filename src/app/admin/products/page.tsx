// app/admin/products/page.tsx
'use client';

import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import Image from 'next/image';

const mockProducts = [
  {
    id: '1',
    title: 'Premium Headphones',
    price: 199.99,
    description: 'Noise-cancelling wireless headphones with 30hr battery',
    image: '/headphones.jpg',
    stock: 45
  },
  {
    id: '2',
    title: 'Smart Watch',
    price: 249.99,
    description: 'Fitness tracking and smartphone notifications',
    image: '/smartwatch.jpg',
    stock: 32
  },
];

export default function AdminProductsPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab="products" />
      
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Product Inventory</h1>
          <div className="flex gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No products match your search' : 'No products available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{product.title}</h3>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`text-sm ${
                      product.stock > 10 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {product.stock} in stock
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}