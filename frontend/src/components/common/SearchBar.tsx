import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Mic } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/products';
import { useLanguageStore } from '@/lib/languageStore';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onProductSelect?: (productId: string) => void;
}

export default function SearchBar({ onSearch, onProductSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof ALL_PRODUCTS>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguageStore();

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSearch('');
    inputRef.current?.focus();
  };

  const handleSelect = (product: typeof ALL_PRODUCTS[0]) => {
    setQuery(product.name);
    setSuggestions([]);
    onSearch(product.name);
    onProductSelect?.(product.id);
    setIsFocused(false);
  };

  return (
    <div className="sticky top-[60px] z-40 bg-white border-b border-border">
      <div className="relative px-4 py-2">
        <div className={`flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 transition-all ${isFocused ? 'ring-2 ring-primary/30' : ''}`}>
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={t('search')}
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          {query ? (
            <button onClick={handleClear}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          ) : (
            <button className="text-primary">
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-white rounded-xl shadow-card-hover border border-border z-50 overflow-hidden">
            {suggestions.map(product => (
              <button
                key={product.id}
                onMouseDown={() => handleSelect(product)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
              >
                <span className="text-xl">{product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand} · {product.weightOrQuantity}</p>
                </div>
                <span className="text-sm font-bold text-primary">₹{product.discountedPrice}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
