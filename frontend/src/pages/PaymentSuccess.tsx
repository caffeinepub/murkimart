import React from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';

interface PaymentSuccessProps {
  onContinue: () => void;
}

export default function PaymentSuccess({ onContinue }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-14 h-14 text-secondary" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground text-sm mb-8">Your payment has been processed successfully.</p>
        <button
          onClick={onContinue}
          className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base shadow-orange mx-auto"
        >
          <ShoppingBag className="w-5 h-5" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
