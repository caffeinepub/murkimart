import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, CheckCircle2, Circle, Truck, Package, ChefHat } from 'lucide-react';
import { toast } from 'sonner';

interface OrderTrackingProps {
  onBack: () => void;
}

const ORDER_STATUSES = [
  { id: 0, label: 'Order Confirmed', icon: CheckCircle2, description: 'Your order has been placed', emoji: '✅', toastMsg: 'Order confirmed! We received your order 🎉' },
  { id: 1, label: 'Being Prepared', icon: ChefHat, description: 'Shop is packing your items', emoji: '👨‍🍳', toastMsg: 'Your order is being prepared! 🍳 Hang tight!' },
  { id: 2, label: 'Picked Up by Rider', icon: Package, description: 'Rider has collected your order', emoji: '📦', toastMsg: 'Your order has been picked up! 🛵 Rider is on the way!' },
  { id: 3, label: 'Out for Delivery', icon: Truck, description: 'On the way to your location', emoji: '🚴', toastMsg: 'Almost there! Your order is out for delivery 📦' },
  { id: 4, label: 'Delivered', icon: CheckCircle2, description: 'Order delivered successfully', emoji: '🎉', toastMsg: 'Order delivered! Enjoy your items 🎉' },
];

export default function OrderTracking({ onBack }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [eta, setEta] = useState(28);
  const prevStatusRef = useRef<number>(-1);

  useEffect(() => {
    // Show initial toast for "Order Confirmed" on mount
    const initialTimer = setTimeout(() => {
      toast.success(ORDER_STATUSES[0].toastMsg, {
        duration: 4000,
        style: { background: '#16A34A', color: '#fff', border: 'none' },
      });
      prevStatusRef.current = 0;
    }, 800);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (currentStatus >= ORDER_STATUSES.length - 1) return;

    const interval = setInterval(() => {
      setCurrentStatus(prev => {
        const next = prev + 1;
        if (next < ORDER_STATUSES.length) {
          const status = ORDER_STATUSES[next];
          const isDelivered = next === ORDER_STATUSES.length - 1;
          toast.success(status.toastMsg, {
            duration: 4000,
            style: {
              background: isDelivered ? '#16A34A' : '#F97316',
              color: '#fff',
              border: 'none',
            },
          });
        }
        return next;
      });
      setEta(prev => Math.max(0, prev - 7));
    }, 8000);

    return () => clearInterval(interval);
  }, [currentStatus]);

  const progressPercent = (currentStatus / (ORDER_STATUSES.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3 shadow-md">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-lg leading-tight">Track Order</h1>
          <p className="text-xs opacity-80">Order #MK{Math.floor(Math.random() * 90000) + 10000}</p>
        </div>
        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-sm font-semibold">{eta} min</span>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Progress Bar */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Order Progress</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {ORDER_STATUSES[currentStatus].emoji} {ORDER_STATUSES[currentStatus].label}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 mb-1">
            <div
              className="h-2.5 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progressPercent}%`, background: '#F97316' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{ORDER_STATUSES[currentStatus].description}</p>
        </div>

        {/* Status Timeline */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h2 className="font-semibold text-foreground mb-4">Status Timeline</h2>
          <div className="space-y-0">
            {ORDER_STATUSES.map((status, index) => {
              const isCompleted = index <= currentStatus;
              const isActive = index === currentStatus;
              const Icon = status.icon;

              return (
                <div key={status.id} className="flex gap-3">
                  {/* Icon + Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isCompleted
                          ? 'text-white shadow-md'
                          : 'bg-muted text-muted-foreground'
                      }`}
                      style={isCompleted ? { background: isActive ? '#F97316' : '#16A34A' } : {}}
                    >
                      {isCompleted ? (
                        <Icon className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    {index < ORDER_STATUSES.length - 1 && (
                      <div
                        className="w-0.5 h-8 mt-1 transition-all duration-500"
                        style={{ background: index < currentStatus ? '#16A34A' : '#e5e7eb' }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pb-6 flex-1">
                    <p
                      className={`font-medium text-sm transition-colors duration-300 ${
                        isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                      style={isActive ? { color: '#F97316' } : {}}
                    >
                      {status.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{status.description}</p>
                    {isActive && (
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ background: '#F97316' }}>
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rider Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h2 className="font-semibold text-foreground mb-3">Your Delivery Rider</h2>
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/rider-avatar.dim_128x128.png"
              alt="Rider"
              className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              style={{ borderColor: '#F97316' }}
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">Raju Kumar</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="text-yellow-500">★</span>
                <span>4.8 rating</span>
                <span className="mx-1">•</span>
                <span>1,240 deliveries</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Hero Splendor • KA 05 AB 1234</p>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:+917348050803"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm"
                style={{ background: '#16A34A' }}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917348050803"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm"
                style={{ background: '#25D366' }}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h2 className="font-semibold text-foreground mb-2">Delivery Address</h2>
          <div className="flex gap-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F97316' }} />
            <div>
              <p className="text-sm font-medium text-foreground">Home</p>
              <p className="text-xs text-muted-foreground">123, MG Road, Bengaluru, Karnataka - 560001</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h2 className="font-semibold text-foreground mb-3">Order Summary</h2>
          <div className="space-y-2">
            {[
              { name: 'Fresh Tomatoes', qty: 2, price: 70 },
              { name: 'Farm Fresh Eggs', qty: 1, price: 84 },
              { name: 'Chicken Breast', qty: 1, price: 269 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                <span className="font-medium text-foreground">₹{item.price}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span style={{ color: '#F97316' }}>₹453</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
