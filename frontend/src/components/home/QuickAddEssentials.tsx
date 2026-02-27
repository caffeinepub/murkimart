import React from 'react';
import { TOP_ESSENTIALS } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';
import { useLanguageStore } from '@/lib/languageStore';

export default function QuickAddEssentials() {
  const { t } = useLanguageStore();

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-display font-bold text-base text-foreground">{t('quickEssentials')}</h2>
          <p className="text-xs text-muted-foreground">Top picks for your daily needs</p>
        </div>
        <span className="text-xs font-semibold text-primary">See all →</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TOP_ESSENTIALS.slice(0, 8).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
