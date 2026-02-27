import { create } from 'zustand';
import { CartItem } from './cartStore';

export type OrderStatus = 'confirmed' | 'preparing' | 'picked_up' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  savings: number;
  couponDiscount: number;
  address: string;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: Date;
  riderName: string;
  estimatedMinutes: number;
}

interface OrderStore {
  orders: Order[];
  currentOrderId: string | null;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'riderName' | 'estimatedMinutes'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getCurrentOrder: () => Order | null;
  setCurrentOrderId: (id: string | null) => void;
}

const RIDER_NAMES = ['Rahul Kumar', 'Amit Singh', 'Suresh Yadav', 'Vikram Gupta', 'Ravi Sharma'];

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [
    {
      id: 'ORD-001',
      items: [],
      subtotal: 245,
      deliveryFee: 0,
      total: 245,
      savings: 35,
      couponDiscount: 0,
      address: 'Murki Bazar, Jaunpur',
      paymentMethod: 'UPI',
      status: 'delivered',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      riderName: 'Rahul Kumar',
      estimatedMinutes: 0,
    },
    {
      id: 'ORD-002',
      items: [],
      subtotal: 189,
      deliveryFee: 25,
      total: 214,
      savings: 28,
      couponDiscount: 0,
      address: 'Station Area, Jaunpur',
      paymentMethod: 'COD',
      status: 'delivered',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      riderName: 'Amit Singh',
      estimatedMinutes: 0,
    },
    {
      id: 'ORD-003',
      items: [],
      subtotal: 320,
      deliveryFee: 0,
      total: 300,
      savings: 45,
      couponDiscount: 20,
      address: 'Jaunpur Road, Murki',
      paymentMethod: 'UPI',
      status: 'delivered',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      riderName: 'Suresh Yadav',
      estimatedMinutes: 0,
    },
  ],
  currentOrderId: null,

  createOrder: (orderData) => {
    const id = `ORD-${Date.now().toString().slice(-6)}`;
    const riderName = RIDER_NAMES[Math.floor(Math.random() * RIDER_NAMES.length)];
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date(),
      riderName,
      estimatedMinutes: 12,
    };
    set((state) => ({ orders: [newOrder, ...state.orders], currentOrderId: id }));
    return id;
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
    }));
  },

  getCurrentOrder: () => {
    const { orders, currentOrderId } = get();
    return orders.find(o => o.id === currentOrderId) || null;
  },

  setCurrentOrderId: (id) => set({ currentOrderId: id }),
}));
