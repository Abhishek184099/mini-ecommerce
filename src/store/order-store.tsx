import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OrderItem = {
  productId: string;
  quantity: number;
  title: string;
  price: number;
};

type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
};

type OrderState = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  getOrders: () => Order[];
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),
      getOrders: () => get().orders,
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.orders = state.orders.map((order) => ({
            ...order,
            createdAt: new Date(order.createdAt),
          }));
        }
      },
    }
  )
);
