import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';
import { useLanguageStore } from '@/lib/languageStore';

function useCountdown(endTime: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = endTime.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return timeLeft;
}

const FLASH_END = new Date(Date.now() + 4 * 3600000 + 23 * 60000 + 45000);
// Filter products that have at least 15% discount based on price vs discountedPrice
const FLASH_PRODUCTS = ALL_PRODUCTS.filter(p => {
  const discountPct = p.price > p.discountedPrice
    ? Math.round(((p.price - p.discountedPrice) / p.price) * 100)
    : 0;
  return discountPct >= 15;
}).slice(0, 4);

export default function FlashDeals() {
  const { t } = useLanguageStore();
  const timeLeft = useCountdown(FLASH_END);

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <h2 className="font-display font-bold text-base text-foreground">{t('flashDeals')}</h2>
        </div>
        <div className="flex items-center gap-1">
          {[
            String(timeLeft.hours).padStart(2, '0'),
            String(timeLeft.minutes).padStart(2, '0'),
            String(timeLeft.seconds).padStart(2, '0'),
          ].map((val, i) => (
            <React.Fragment key={i}>
              <span className="bg-foreground text-background text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[24px] text-center">
                {val}
              </span>
              {i < 2 && <span className="text-foreground font-bold text-xs">:</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {FLASH_PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
