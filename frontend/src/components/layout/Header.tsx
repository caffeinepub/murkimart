import React from 'react';
import { MapPin, Clock, ChevronDown } from 'lucide-react';
import { useLanguageStore } from '@/lib/languageStore';

interface HeaderProps {
  onLocationClick?: () => void;
}

export default function Header({ onLocationClick }: HeaderProps) {
  const { t } = useLanguageStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo + Location */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">MurkiMart</span>
          </div>

          <button
            onClick={onLocationClick}
            className="flex items-center gap-1 text-left min-w-0 ml-2"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-semibold text-foreground truncate max-w-[100px]">Murki Bazar</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
              </div>
              <p className="text-[10px] text-muted-foreground truncate">Jaunpur, UP</p>
            </div>
          </button>
        </div>

        {/* Delivery Badge */}
        <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 shrink-0">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary whitespace-nowrap">
            {t('deliveryIn')} 10-15 {t('minutes')}
          </span>
        </div>
      </div>
    </header>
  );
}
