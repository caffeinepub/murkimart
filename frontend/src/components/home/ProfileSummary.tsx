import React from 'react';
import { User, ShoppingBag, MapPin, Award, HelpCircle, ChevronRight, LogIn } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';
import { useNavigationStore } from '@/lib/navigationStore';

const quickLinks = [
  { icon: ShoppingBag, label: 'My Orders', color: 'text-orange-500' },
  { icon: MapPin, label: 'Saved Addresses', color: 'text-green-600' },
  { icon: Award, label: 'Loyalty Points', color: 'text-orange-500' },
  { icon: HelpCircle, label: 'Help & Support', color: 'text-green-600' },
];

export default function ProfileSummary() {
  const { isLoggedIn, user } = useAuthStore();
  const { navigateTo } = useNavigationStore();

  const goToProfile = () => {
    if (navigateTo) navigateTo('profile');
  };

  return (
    <section className="mx-4 mb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">My Account</h2>
        <button
          onClick={goToProfile}
          className="text-xs font-medium text-orange-500 flex items-center gap-0.5"
        >
          View Profile <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* User info card */}
      {isLoggedIn && user ? (
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-4 mb-3 shadow-md">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base leading-tight truncate">{user.name}</p>
            <p className="text-white/80 text-sm mt-0.5">{user.phone}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>
      ) : (
        <button
          onClick={goToProfile}
          className="w-full flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-4 mb-3 shadow-md text-left"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-base leading-tight">Login / Sign Up</p>
            <p className="text-white/80 text-sm mt-0.5">Track orders, save addresses & more</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </button>
      )}

      {/* Quick link cards */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {quickLinks.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            onClick={goToProfile}
            className="flex items-center gap-2.5 bg-card border border-border rounded-xl p-3 shadow-sm active:scale-95 transition-transform text-left"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              color === 'text-orange-500' ? 'bg-orange-50' : 'bg-green-50'
            }`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
          </button>
        ))}
      </div>

      {/* Go to Profile button */}
      <button
        onClick={goToProfile}
        className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
      >
        <User className="w-4 h-4" />
        Go to Profile
      </button>
    </section>
  );
}
