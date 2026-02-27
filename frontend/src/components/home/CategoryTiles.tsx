import React from 'react';
import { CATEGORIES } from '@/lib/products';

interface CategoryTilesProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function CategoryTiles({ onCategorySelect }: CategoryTilesProps) {
  return (
    <div className="px-4 py-2">
      <h2 className="font-display font-bold text-base text-foreground mb-3">Shop by Category</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors border border-border">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-2xl">${cat.emoji}</span>`;
                }}
              />
            </div>
            <span className="text-[10px] font-medium text-foreground text-center leading-tight max-w-[64px]">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
