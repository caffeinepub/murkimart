import React from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useLanguageStore } from '@/lib/languageStore';

interface CartBottomBarProps {
  onCheckout: () => void;
}

export default function CartBottomBar({ onCheckout }: CartBottomBarProps) {
  const { getItemCount, getSubtotal, getSavings } = useCartStore();
  const { t } = useLanguageStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const savings = getSavings();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 animate-slide-in-bottom">
      <button
        onClick={onCheckout}
        className="w-full max-w-lg mx-auto flex items-center justify-between bg-primary text-white rounded-2xl px-4 py-3 shadow-orange"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-1.5">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-medium opacity-90">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
            {savings > 0 && (
              <p className="text-[10px] opacity-75">Saving ₹{savings}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-bold text-base">₹{subtotal}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
            <span className="text-sm font-semibold">{t('checkout')}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </button>
    </div>
  );
}
