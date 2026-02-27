import React from 'react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import { useOrderStore } from '@/lib/orderStore';

interface OrderConfirmationProps {
  orderId: string;
  onTrackOrder: () => void;
  onContinueShopping: () => void;
}

export default function OrderConfirmation({ orderId, onContinueShopping }: OrderConfirmationProps) {
  const { orders } = useOrderStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Success Header */}
      <div className="bg-gradient-to-b from-secondary to-secondary/80 px-4 pt-12 pb-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-card">
          <CheckCircle className="w-12 h-12 text-secondary" />
        </div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Order Confirmed! 🎉</h1>
        <p className="text-white/80 text-sm">Your order has been placed successfully</p>
        <div className="mt-3 bg-white/20 rounded-full px-4 py-1.5 inline-block">
          <span className="text-white font-bold text-sm">{orderId}</span>
        </div>
      </div>

      {/* ETA Card */}
      <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-card p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Clock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Estimated Delivery</p>
          <p className="font-display font-bold text-xl text-foreground">10-15 mins</p>
          <p className="text-xs text-secondary font-medium">⚡ Express Delivery</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-border p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Order Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Paid</span>
            <span className="font-bold text-foreground">₹{order.total}</span>
          </div>
          {order.savings > 0 && (
            <div className="flex justify-between">
              <span className="text-secondary">You Saved</span>
              <span className="font-medium text-secondary">₹{order.savings}</span>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mx-4 mt-3 bg-white rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">Delivering to</span>
        </div>
        <p className="text-sm text-muted-foreground">{order.address}</p>
      </div>

      {/* Rider Info */}
      <div className="mx-4 mt-3 bg-primary/5 rounded-2xl border border-primary/20 p-4 flex items-center gap-3">
        <img
          src="/assets/generated/rider-avatar.dim_128x128.png"
          alt="Rider"
          className="w-12 h-12 rounded-full object-cover bg-muted"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div>
          <p className="text-xs text-muted-foreground">Your Rider</p>
          <p className="font-semibold text-sm text-foreground">{order.riderName}</p>
          <p className="text-xs text-primary">On the way to pick up your order</p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 mt-6 space-y-3">
        <button
          onClick={onContinueShopping}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-orange"
        >
          Continue Shopping
        </button>
      </div>

      <div className="h-8" />
    </div>
  );
}
