'use client';


import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { ProductType } from '@/lib/types';

export function AddToCartButton({ product }: { product: ProductType }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
      onClick={() =>
        addItem({
          productId: product.id,
          price: product.price,
          title: product.title,
          thumbnail: product.thumbnail,
        })
      }
      className="w-full"
    >
      Add to Cart
    </Button>
  );
}
