'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

type AdminSidebarProps = {
  activeTab?: 'dashboard' | 'orders' | 'products';
};

export function AdminSidebar({ activeTab = 'dashboard' }: AdminSidebarProps) {
  const { logout } = useAuthStore();

  return (
    <div className="w-64 border-r bg-gray-50 p-4 flex flex-col h-screen sticky top-0">
      <div className="mb-8 p-2">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="space-y-1 flex-1">
        <Link 
          href="/admin/dashboard" 
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            activeTab === 'dashboard' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link 
          href="/admin/orders" 
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            activeTab === 'orders' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          Orders
        </Link>
        <Link 
          href="/admin/products" 
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            activeTab === 'products' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Package className="h-4 w-4" />
          Products
        </Link>
      </nav>
      
      <div className="pt-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-100"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
