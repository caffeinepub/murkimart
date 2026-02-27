import React from 'react';
import SearchBar from '@/components/common/SearchBar';
import PromotionalCarousel from '@/components/home/PromotionalCarousel';
import CategoryTiles from '@/components/home/CategoryTiles';
import QuickAddEssentials from '@/components/home/QuickAddEssentials';
import FlashDeals from '@/components/home/FlashDeals';
import CustomerCareContact from '@/components/home/CustomerCareContact';
import ProfileSummary from '@/components/home/ProfileSummary';

interface HomeProps {
  onSearch: (query: string) => void;
  onCategorySelect: (categoryId: string) => void;
  onNavigate: (page: string) => void;
}

export default function Home({ onSearch, onCategorySelect, onNavigate }: HomeProps) {
  const handleSearch = (query: string) => {
    if (query.length > 0) {
      onSearch(query);
      onNavigate('catalog');
    }
  };

  return (
    <div className="pb-4">
      <SearchBar onSearch={handleSearch} />
      <PromotionalCarousel />
      <CategoryTiles onCategorySelect={(id) => { onCategorySelect(id); onNavigate('catalog'); }} />
      <div className="my-2 mx-4 h-px bg-border" />
      <QuickAddEssentials />
      {/* Extra spacing around the featured customer care banner */}
      <div className="my-3 mx-4 h-px bg-border" />
      <CustomerCareContact />
      <div className="my-3 mx-4 h-px bg-border" />
      <FlashDeals />
      <div className="my-3 mx-4 h-px bg-border" />
      <ProfileSummary />
    </div>
  );
}
