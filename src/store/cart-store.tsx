import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


type CartItem = {
    productId : number,
    title : string,
    price : number,
    quantity : number,
    thumbnail: string
}

type CartState = {
  items : CartItem[],
  addItem : (item : Omit<CartItem , 'quantity'>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.productId === item.productId);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.productId === item.productId 
                ? {...i, quantity: i.quantity + 1} 
                : i
            )
          };
        }
        return { items: [...state.items, {...item, quantity: 1}] };
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(i => 
          i.productId === productId ? {...i, quantity} : i
        ).filter(i => i.quantity > 0)
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

