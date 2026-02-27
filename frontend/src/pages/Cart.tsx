import React, { useState } from 'react';
import { Minus, Plus, Trash2, Tag, ChevronRight, ShoppingBag, Scale } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useLanguageStore } from '@/lib/languageStore';

interface CartProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function Cart({ onCheckout, onContinueShopping }: CartProps) {
  const { items, updateQuantity, removeFromCart, applyCoupon, removeCoupon, couponCode, couponDiscount, getSubtotal, getSavings, getTotal } = useCartStore();
  const { t } = useLanguageStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = getSubtotal();
  const savings = getSavings();
  const total = getTotal();

  const VALID_COUPONS: Record<string, number> = { 'MURKI10': 10, 'FIRST50': 50, 'SAVE20': 20, 'JAUNPUR15': 15 };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(`Coupon applied! ₹${couponDiscount || VALID_COUPONS[couponInput.toUpperCase()]} off`);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try MURKI10, FIRST50, or SAVE20');
      setCouponSuccess('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-display font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Add items to get started with your order</p>
        <button
          onClick={onContinueShopping}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <h1 className="font-display font-bold text-lg text-foreground">Your Cart</h1>
        <p className="text-xs text-muted-foreground">{items.reduce((s, i) => s + i.quantity, 0)} items</p>
      </div>

      {/* Free Delivery Banner */}
      <div className="mx-4 mt-3 bg-secondary/10 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <span className="text-lg">🚚</span>
        <p className="text-xs font-medium text-secondary">
          <strong>FREE delivery</strong> on all orders!
        </p>
      </div>

      {/* Items */}
      <div className="px-4 mt-3 space-y-3">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-3 bg-white rounded-2xl border border-border p-3">
            <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center shrink-0">
              <span className="text-3xl">{product.image}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Scale className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{product.weight}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-foreground">₹{product.discountedPrice * quantity}</span>
                {product.price > product.discountedPrice && (
                  <span className="text-xs text-muted-foreground line-through">₹{product.price * quantity}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center bg-primary rounded-xl overflow-hidden">
                <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-2 py-1 text-white hover:bg-white/20">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-white font-bold text-sm px-2">{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-2 py-1 text-white hover:bg-white/20">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Apply Coupon</span>
        </div>
        {couponCode ? (
          <div className="flex items-center justify-between bg-secondary/10 rounded-xl px-3 py-2">
            <div>
              <span className="text-sm font-bold text-secondary">{couponCode}</span>
              <p className="text-xs text-secondary">₹{couponDiscount} discount applied!</p>
            </div>
            <button onClick={() => { removeCoupon(); setCouponSuccess(''); setCouponInput(''); }} className="text-xs text-muted-foreground underline">Remove</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none"
            />
            <button onClick={handleApplyCoupon} className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold">
              Apply
            </button>
          </div>
        )}
        {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
        {couponSuccess && <p className="text-xs text-secondary mt-1">{couponSuccess}</p>}
        <p className="text-[10px] text-muted-foreground mt-2">Try: MURKI10, FIRST50, SAVE20, JAUNPUR15</p>
      </div>

      {/* Order Summary */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-border p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Product Savings</span>
              <span className="font-medium text-secondary">-₹{savings}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium text-secondary">FREE 🎉</span>
          </div>
          {couponDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Coupon ({couponCode})</span>
              <span className="font-medium text-secondary">-₹{couponDiscount}</span>
            </div>
          )}
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between">
            <span className="font-bold text-foreground">Total Payable</span>
            <span className="font-bold text-lg text-foreground">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2">
        <button
          onClick={onCheckout}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-orange flex items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
