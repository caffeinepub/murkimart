import React from 'react';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';

interface PaymentFailureProps {
  onRetry: () => void;
  onBack: () => void;
}

export default function PaymentFailure({ onRetry, onBack }: PaymentFailureProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-14 h-14 text-destructive" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-2">Payment Failed</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Something went wrong with your payment. Please try again or choose a different payment method.
        </p>
        <div className="space-y-3 w-full max-w-xs mx-auto">
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base shadow-orange"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 bg-muted text-foreground px-8 py-3 rounded-2xl font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
