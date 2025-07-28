// app/admin/dashboard/page.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';
import { useOrderStore } from '@/store/order-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ShoppingBag } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminDashboard() {
  const { isAuthenticated } = useAuthStore();
  const { orders } = useOrderStore();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      loadStats();
    }
  }, [isAuthenticated, router, orders]);

  const loadStats = () => {
    const products = [1,1]; 
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab="dashboard" />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Products</CardTitle>
              <Package className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Orders</CardTitle>
              <ShoppingBag className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Revenue</CardTitle>
              <span className="h-5 w-5 text-gray-400">$</span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="border-b py-3 last:border-0">
                <div className="flex justify-between">
                  <span className="font-medium">Order #{order.id.slice(0, 8)}</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {order.customer.name} • {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            )}
            {orders.length > 5 && (
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/orders">View All Orders</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}