import React from 'react';
import { Home, Grid3X3, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useLanguageStore } from '@/lib/languageStore';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const itemCount = useCartStore(s => s.getItemCount());
  const { t } = useLanguageStore();

  const tabs = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'catalog', label: t('categories'), icon: Grid3X3 },
    { id: 'cart', label: t('cart'), icon: ShoppingCart, badge: itemCount },
    { id: 'profile', label: t('profile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {tabs.map(({ id, label, icon: Icon, badge }) => {
          const isActive = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
