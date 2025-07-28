'use client';

import { useCartStore } from '@/store/cart-store';
import { useOrderStore } from '@/store/order-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  address: z.string().min(1, 'Address is required'),
});

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addOrder({
      customer: {
        name: data.name,
        email: data.email,
        address: data.address,
      },
      items : items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
        thumbnail: item.thumbnail,
      })),
      totalAmount: total,
    });
    
    clearCart();
    router.push('/success');
  };

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <div key={item.productId} className="flex border-b py-4">
                <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="object-cover mr-4 rounded"
                  width={300}
                  height={200}
                  unoptimized
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => 
                        updateQuantity(item.productId, parseInt(e.target.value || '1'))
                      }
                      className="w-20 mr-2"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="border rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input {...register('name')} placeholder="John Doe" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input {...register('email')} type="email" placeholder="john@example.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Shipping Address</label>
                  <Input {...register('address')} placeholder="123 Main St, City" />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>
                
                <Button type="submit" className="w-full mt-4">
                  Place Order
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}