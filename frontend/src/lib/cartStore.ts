import { create } from 'zustand';

export interface CartItem {
  product: import('./products').Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  addToCart: (product: import('./products').Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getSavings: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  'MURKI10': 10,
  'FIRST50': 50,
  'SAVE20': 20,
  'JAUNPUR15': 15,
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  couponCode: '',
  couponDiscount: 0,

  addToCart: (product) => {
    set((state) => {
      const existing = state.items.find(i => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({ items: state.items.filter(i => i.product.id !== productId) }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      items: state.items.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    }));
  },

  clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0 }),

  applyCoupon: (code) => {
    const discount = VALID_COUPONS[code.toUpperCase()];
    if (discount) {
      set({ couponCode: code.toUpperCase(), couponDiscount: discount });
      return true;
    }
    return false;
  },

  removeCoupon: () => set({ couponCode: '', couponDiscount: 0 }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.product.discountedPrice * item.quantity, 0);
  },

  getSavings: () => {
    return get().items.reduce((sum, item) => {
      const saving = (item.product.mrp - item.product.discountedPrice) * item.quantity;
      return sum + saving;
    }, 0);
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 199) return 0;
    if (subtotal >= 100) return 25;
    return 50;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const delivery = get().getDeliveryFee();
    const coupon = get().couponDiscount;
    return Math.max(0, subtotal + delivery - coupon);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
