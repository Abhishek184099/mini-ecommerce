// app/admin/orders/page.tsx
'use client';

import { useOrderStore } from '@/store/order-store';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import Image from 'next/image';

export default function AdminOrdersPage() {
  const { orders } = useOrderStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => 
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab="orders" />
      
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Customer Orders</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No orders match your search' : 'No orders have been placed yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                >
                  <div>
                    <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {order.customer.name} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                    {expandedOrderId === order.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="border-t p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Customer Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <span className="text-gray-600 w-20">Name:</span>
                            <span>{order.customer.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-600 w-20">Email:</span>
                            <span>{order.customer.email}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-600 w-20">Address:</span>
                            <span>{order.customer.address}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-600 w-20">Date:</span>
                            <span>{new Date(order.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3">Order Items ({order.items.length})</h3>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex gap-4 border-b pb-4 last:border-0">
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                width={60}
                                height={60}
                                className="w-15 h-15 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-600">ID: {item.productId}</p>
                                <div className="flex justify-between mt-1">
                                  <span className="text-sm">Qty: {item.quantity}</span>
                                  <span className="font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between font-medium pt-2">
                            <span>Total Amount:</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}