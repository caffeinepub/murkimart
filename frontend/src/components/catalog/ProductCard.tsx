import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';
import { useLanguageStore } from '@/lib/languageStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCartStore();
  const { t } = useLanguageStore();
  const cartItem = items.find(i => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative bg-muted/50 aspect-square flex items-center justify-center p-4">
        <span className="text-5xl">{product.emoji}</span>
        {product.discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            {product.discountPercent}% OFF
          </span>
        )}
        {!product.isInStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground bg-white px-2 py-1 rounded-lg border border-border">
              {t('outOfStock')}
            </span>
          </div>
        )}
        {product.isVeg && (
          <span className="absolute top-2 right-2 w-4 h-4 border-2 border-secondary rounded-sm flex items-center justify-center">
            <span className="w-2 h-2 bg-secondary rounded-full" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-[11px] text-muted-foreground mb-0.5">{product.weightOrQuantity}</p>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight mb-1">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[11px] font-medium text-foreground">{product.rating}</span>
          <span className="text-[10px] text-muted-foreground">({(product.reviewCount / 1000).toFixed(1)}K)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm font-bold text-foreground">₹{product.discountedPrice}</span>
          {product.mrp > product.discountedPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
          )}
        </div>

        {/* Add Button */}
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              onClick={() => product.isInStock && addToCart(product)}
              disabled={!product.isInStock}
              className={`w-full py-1.5 rounded-xl text-sm font-bold transition-all ${
                product.isInStock
                  ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white active:scale-95'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {product.isInStock ? t('addToCart') : t('outOfStock')}
            </button>
          ) : (
            <div className="flex items-center justify-between bg-primary rounded-xl overflow-hidden">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="px-3 py-1.5 text-white hover:bg-white/20 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-white font-bold text-sm">{quantity}</span>
              <button
                onClick={() => addToCart(product)}
                className="px-3 py-1.5 text-white hover:bg-white/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
