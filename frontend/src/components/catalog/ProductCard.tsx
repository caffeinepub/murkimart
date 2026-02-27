import React from 'react';
import { Star, Plus, Minus, Zap } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';
import { useLanguageStore } from '@/lib/languageStore';
import { useInstantOrder } from '@/hooks/useInstantOrder';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCartStore();
  const { t } = useLanguageStore();
  const { handleBuyNow } = useInstantOrder();

  const cartItem = items.find(i => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  // Calculate discount percent from price vs discountedPrice
  const discountPercent = product.price > product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleBuyNow(product);
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative bg-muted/50 aspect-square flex items-center justify-center p-4">
        <span className="text-5xl">{product.image}</span>
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            {discountPercent}% OFF
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground bg-white px-2 py-1 rounded-lg border border-border">
              {t('outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-[11px] text-muted-foreground mb-0.5">{product.unit}</p>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight mb-1">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[11px] font-medium text-foreground">{product.rating}</span>
          <span className="text-[10px] text-muted-foreground">({(product.reviews / 1000).toFixed(1)}K)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm font-bold text-foreground">₹{product.discountedPrice}</span>
          {product.price > product.discountedPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.price}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-1.5">
          {/* Add to Cart / Quantity Stepper */}
          {quantity === 0 ? (
            <button
              onClick={() => product.inStock && addToCart(product)}
              disabled={!product.inStock}
              className={`w-full py-1.5 rounded-xl text-sm font-bold transition-all ${
                product.inStock
                  ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white active:scale-95'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {product.inStock ? t('addToCart') : t('outOfStock')}
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

          {/* Buy Now — only for in-stock products */}
          {product.inStock && (
            <button
              onClick={handleBuyNowClick}
              className="w-full py-1.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              style={{ backgroundColor: '#F97316', color: '#fff' }}
            >
              <Zap className="w-3.5 h-3.5" />
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
