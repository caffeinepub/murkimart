import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Clock, ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { useOrderStore, OrderStatus } from '@/lib/orderStore';
import { Progress } from '@/components/ui/progress';

const STATUS_STEPS: { id: OrderStatus; label: string; emoji: string; desc: string }[] = [
  { id: 'confirmed', label: 'Order Confirmed', emoji: '✅', desc: 'Your order has been received' },
  { id: 'preparing', label: 'Being Prepared', emoji: '👨‍🍳', desc: 'Store is packing your items' },
  { id: 'picked_up', label: 'Picked Up', emoji: '🛵', desc: 'Rider has picked up your order' },
  { id: 'out_for_delivery', label: 'Out for Delivery', emoji: '🚀', desc: 'Rider is on the way' },
  { id: 'delivered', label: 'Delivered', emoji: '🎉', desc: 'Order delivered successfully' },
];

const STATUS_ORDER: OrderStatus[] = ['confirmed', 'preparing', 'picked_up', 'out_for_delivery', 'delivered'];

interface OrderTrackingProps {
  orderId: string;
  onBack: () => void;
}

export default function OrderTracking({ orderId, onBack }: OrderTrackingProps) {
  const { orders, updateOrderStatus } = useOrderStore();
  const order = orders.find(o => o.id === orderId);
  const [etaSeconds, setEtaSeconds] = useState(12 * 60);

  // Simulate order progression
  useEffect(() => {
    if (!order || order.status === 'delivered') return;
    const currentIdx = STATUS_ORDER.indexOf(order.status);
    if (currentIdx < STATUS_ORDER.length - 1) {
      const timer = setTimeout(() => {
        updateOrderStatus(orderId, STATUS_ORDER[currentIdx + 1]);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [order?.status, orderId, updateOrderStatus]);

  // ETA countdown
  useEffect(() => {
    if (!order || order.status === 'delivered') return;
    const timer = setInterval(() => {
      setEtaSeconds(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [order?.status]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Order not found</p>
        <button onClick={onBack} className="mt-4 text-primary font-medium">Go Back</button>
      </div>
    );
  }

  const currentStatusIdx = STATUS_ORDER.indexOf(order.status);
  const progressPercent = Math.round(((currentStatusIdx + 1) / STATUS_ORDER.length) * 100);
  const etaMinutes = Math.ceil(etaSeconds / 60);
  const isDelivered = order.status === 'delivered';
  const isOutForDelivery = order.status === 'out_for_delivery';

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-base text-foreground">Track Order</h1>
          <p className="text-xs text-muted-foreground">{orderId}</p>
        </div>
        {!isDelivered && (
          <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">{etaMinutes} mins</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-white border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Delivery Progress</span>
          <span className="text-xs font-bold text-primary">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Rider Info (shown during out_for_delivery) */}
      {(isOutForDelivery || isDelivered) && (
        <div className="mx-4 mt-4 bg-primary/5 border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/assets/generated/rider-avatar.dim_128x128.png"
                alt="Rider"
                className="w-14 h-14 rounded-full object-cover bg-muted border-2 border-primary"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-14 h-14 rounded-full bg-primary flex items-center justify-center border-2 border-primary';
                    fallback.innerHTML = '<span class="text-white font-bold text-xl">R</span>';
                    parent.appendChild(fallback);
                  }
                }}
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Your Delivery Partner</p>
              <p className="font-bold text-sm text-foreground">{order.riderName}</p>
              {!isDelivered && (
                <p className="text-xs text-primary font-medium">
                  🛵 Rider arriving in {etaMinutes} mins
                </p>
              )}
              {isDelivered && (
                <p className="text-xs text-secondary font-medium">✅ Order Delivered!</p>
              )}
            </div>
            {!isDelivered && (
              <div className="flex gap-2">
                <button className="w-9 h-9 bg-white rounded-full border border-border flex items-center justify-center shadow-xs">
                  <Phone className="w-4 h-4 text-primary" />
                </button>
                <button className="w-9 h-9 bg-white rounded-full border border-border flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Timeline */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-border p-4">
        <h3 className="font-semibold text-sm text-foreground mb-4">Order Status</h3>
        <div className="space-y-0">
          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = currentStatusIdx >= idx;
            const isCurrent = currentStatusIdx === idx;
            const isLast = idx === STATUS_STEPS.length - 1;

            return (
              <div key={step.id} className="flex gap-3">
                {/* Icon + Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  } ${isCurrent && !isDelivered ? 'ring-4 ring-primary/20' : ''}`}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-8 mt-1 transition-all ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{step.emoji}</span>
                    <p className={`text-sm font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    {isCurrent && !isDelivered && (
                      <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-border p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Order Summary</h3>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Total</span>
            <span className="font-bold">₹{order.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivering to</span>
            <span className="font-medium text-right max-w-[180px] text-xs">{order.address}</span>
          </div>
          {order.savings > 0 && (
            <div className="flex justify-between">
              <span className="text-secondary">You Saved</span>
              <span className="font-medium text-secondary">₹{order.savings}</span>
            </div>
          )}
        </div>
      </div>

      {isDelivered && (
        <div className="mx-4 mt-4">
          <button
            onClick={onBack}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-orange"
          >
            Continue Shopping 🛒
          </button>
        </div>
      )}
    </div>
  );
}
