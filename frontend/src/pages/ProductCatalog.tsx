import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ALL_PRODUCTS, CATEGORIES, Product } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';
import SearchBar from '@/components/common/SearchBar';

interface ProductCatalogProps {
  initialCategory?: string;
  initialSearch?: string;
}

export default function ProductCatalog({ initialCategory, initialSearch }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [showFilters, setShowFilters] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'rating'>('relevance');

  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS;

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (vegOnly) products = products.filter(p => p.isVeg);
    if (inStockOnly) products = products.filter(p => p.isInStock);

    switch (sortBy) {
      case 'price_asc': return [...products].sort((a, b) => a.discountedPrice - b.discountedPrice);
      case 'price_desc': return [...products].sort((a, b) => b.discountedPrice - a.discountedPrice);
      case 'rating': return [...products].sort((a, b) => b.rating - a.rating);
      default: return products;
    }
  }, [selectedCategory, searchQuery, vegOnly, inStockOnly, sortBy]);

  return (
    <div className="pb-4">
      <SearchBar onSearch={setSearchQuery} />

      {/* Category Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-border">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-muted text-muted-foreground hover:bg-primary/10'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            showFilters ? 'bg-primary text-white border-primary' : 'border-border text-foreground'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>

        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            vegOnly ? 'bg-secondary text-white border-secondary' : 'border-border text-foreground'
          }`}
        >
          🌿 Veg Only
        </button>

        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            inStockOnly ? 'bg-primary text-white border-primary' : 'border-border text-foreground'
          }`}
        >
          In Stock
        </button>

        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs font-semibold bg-transparent border border-border rounded-full px-3 py-1.5 outline-none"
          >
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-2">
        <p className="text-xs text-muted-foreground">
          {filteredProducts.length} products found
          {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="px-4 grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-base font-semibold text-foreground mb-1">No products found</p>
          <p className="text-sm text-muted-foreground text-center">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
