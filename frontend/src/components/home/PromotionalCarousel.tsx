import React, { useState, useEffect } from 'react';

const BANNERS = [
  {
    id: 1,
    image: '/assets/generated/banner-groceries.dim_800x300.png',
    title: 'Flat 30% OFF',
    subtitle: 'On Fresh Vegetables & Fruits',
    bg: 'from-orange-500 to-orange-600',
    emoji: '🥦',
  },
  {
    id: 2,
    image: '/assets/generated/banner-dairy.dim_800x300.png',
    title: 'Fresh Daily',
    subtitle: 'Dairy Products Delivered Fresh',
    bg: 'from-green-500 to-green-600',
    emoji: '🥛',
  },
  {
    id: 3,
    image: '/assets/generated/banner-snacks.dim_800x300.png',
    title: 'Snack Time Deals',
    subtitle: 'Up to 25% OFF on Snacks',
    bg: 'from-yellow-500 to-orange-500',
    emoji: '🍿',
  },
];

export default function PromotionalCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-3">
      <div className="relative rounded-2xl overflow-hidden">
        {BANNERS.map((banner, idx) => (
          <div
            key={banner.id}
            className={`transition-all duration-500 ${idx === current ? 'block' : 'hidden'}`}
          >
            <div className={`bg-gradient-to-r ${banner.bg} rounded-2xl p-5 flex items-center justify-between min-h-[120px]`}>
              <div className="flex-1">
                <p className="text-white/80 text-xs font-medium mb-1">Limited Time Offer</p>
                <h3 className="text-white font-display font-bold text-2xl leading-tight">{banner.title}</h3>
                <p className="text-white/90 text-sm mt-1">{banner.subtitle}</p>
                <button className="mt-3 bg-white text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full">
                  Shop Now →
                </button>
              </div>
              <div className="text-6xl ml-4">{banner.emoji}</div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all ${idx === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
