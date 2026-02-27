import React, { useState } from 'react';
import {
  MapPin, Package, Star, HelpCircle, Globe, Trash2,
  ChevronRight, MessageCircle, Send, X, LogOut, LogIn
} from 'lucide-react';
import { useAddressStore } from '@/lib/addressStore';
import { useOrderStore } from '@/lib/orderStore';
import { useLanguageStore } from '@/lib/languageStore';
import { useAuthStore } from '@/lib/authStore';
import { Badge } from '@/components/ui/badge';

const FAQ_ITEMS = [
  { q: 'How long does delivery take?', a: 'We deliver within 10-15 minutes in Murki Jaunpur area.' },
  { q: 'What is the minimum order amount?', a: 'There is no minimum order amount. Free delivery above ₹199.' },
  { q: 'How do I track my order?', a: 'Go to Order History and tap on any active order to track it live.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 2 minutes of placing. Contact support for help.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI (Google Pay, PhonePe), Credit/Debit Cards, and Cash on Delivery.' },
];

const MOCK_CHAT = [
  { from: 'support', text: 'Namaste! 🙏 Welcome to MurkiMart Support. How can I help you today?' },
];

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const { addresses, deleteAddress } = useAddressStore();
  const { orders } = useOrderStore();
  const { language, setLanguage, t } = useLanguageStore();
  const { isLoggedIn, user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT);
  const [chatInput, setChatInput] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const loyaltyPoints = 120;

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: 'support',
        text: 'Thank you for your message! Our team will get back to you shortly. For urgent help, call 1800-XXX-XXXX.'
      }]);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-secondary/10 text-secondary';
      case 'out_for_delivery': return 'bg-primary/10 text-primary';
      case 'confirmed': return 'bg-blue-100 text-blue-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'picked_up': return 'Picked Up';
      default: return status;
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  // ── Not logged in: show login prompt ──────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pt-6 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white">My Account</h1>
              <p className="text-white/80 text-sm">Sign in to access your profile</p>
            </div>
          </div>
        </div>

        {/* Login Prompt Card */}
        <div className="mx-4 -mt-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-white rounded-2xl shadow-card border border-border p-5 flex items-center gap-4 hover:bg-muted/20 active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-foreground text-base">Login / Sign Up</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Access orders, addresses, loyalty points & more
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        </div>

        {/* Benefits */}
        <div className="px-4 mt-5 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Why sign in?
          </p>
          {[
            { icon: '📦', title: 'Track your orders', desc: 'Real-time order tracking & history' },
            { icon: '⭐', title: 'Earn loyalty points', desc: 'Get rewards on every purchase' },
            { icon: '📍', title: 'Save addresses', desc: 'Quick checkout with saved locations' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Logged in: full profile ────────────────────────────────────────────────
  const sections = [
    { id: 'addresses', label: t('savedAddresses'), icon: MapPin, count: addresses.length },
    { id: 'orders', label: t('orderHistory'), icon: Package, count: orders.length },
    { id: 'loyalty', label: t('loyaltyPoints'), icon: Star, extra: `${loyaltyPoints} pts` },
    { id: 'language', label: t('language'), icon: Globe, extra: language === 'en' ? 'English' : 'हिंदी' },
    { id: 'support', label: t('helpSupport'), icon: HelpCircle },
  ];

  return (
    <div className="pb-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pt-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40">
            <span className="text-3xl">👤</span>
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl text-white">
              {user?.name || 'My Account'}
            </h1>
            <p className="text-white/80 text-sm">
              {user?.phone ? `+91 ${user.phone}` : user?.email || 'Murki Jaunpur, UP'}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span className="text-white/90 text-xs font-medium">{loyaltyPoints} Loyalty Points</span>
            </div>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Loyalty Points Banner */}
      <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 border border-border">
        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{loyaltyPoints} Points = ₹{loyaltyPoints / 10} off</p>
          <p className="text-xs text-muted-foreground">Redeem on your next order</p>
        </div>
        <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          Redeem
        </button>
      </div>

      {/* Sections */}
      <div className="px-4 mt-4 space-y-2">
        {sections.map(({ id, label, icon: Icon, count, extra }) => (
          <div key={id}>
            <button
              onClick={() => setActiveSection(activeSection === id ? null : id)}
              className="w-full flex items-center gap-3 bg-white rounded-2xl border border-border p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 text-left text-sm font-semibold text-foreground">{label}</span>
              {count !== undefined && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{count}</span>
              )}
              {extra && (
                <span className="text-xs text-muted-foreground">{extra}</span>
              )}
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === id ? 'rotate-90' : ''}`} />
            </button>

            {/* Expanded Content */}
            {activeSection === id && (
              <div className="mt-2 bg-white rounded-2xl border border-border overflow-hidden">
                {/* Saved Addresses */}
                {id === 'addresses' && (
                  <div className="p-4 space-y-3">
                    {addresses.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No saved addresses</p>
                    ) : (
                      addresses.map(addr => (
                        <div key={addr.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold text-foreground">{addr.label}</span>
                              {addr.isDefault && <span className="text-[10px] text-secondary">Default</span>}
                            </div>
                            <p className="text-xs text-muted-foreground">{addr.houseNumber}, {addr.street}</p>
                            <p className="text-xs text-muted-foreground">{addr.locality}, Jaunpur</p>
                          </div>
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Order History */}
                {id === 'orders' && (
                  <div className="divide-y divide-border">
                    {orders.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-6">No orders yet</p>
                    ) : (
                      orders.slice(0, 5).map(order => (
                        <div key={order.id} className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-bold text-foreground">{order.id}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{order.address}</p>
                            <p className="text-sm font-bold text-foreground">₹{order.total}</p>
                          </div>
                          {order.savings > 0 && (
                            <p className="text-xs text-secondary mt-0.5">Saved ₹{order.savings}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Loyalty Points */}
                {id === 'loyalty' && (
                  <div className="p-4">
                    <div className="text-center py-4">
                      <div className="text-5xl mb-3">⭐</div>
                      <p className="font-display font-bold text-3xl text-foreground">{loyaltyPoints}</p>
                      <p className="text-sm text-muted-foreground mb-4">Loyalty Points</p>
                      <div className="bg-yellow-50 rounded-xl p-3 text-sm">
                        <p className="font-semibold text-foreground">{loyaltyPoints} points = ₹{loyaltyPoints / 10} discount</p>
                        <p className="text-xs text-muted-foreground mt-1">Earn 1 point for every ₹10 spent</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-sm p-2 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Order ORD-001</span>
                        <span className="font-medium text-secondary">+24 pts</span>
                      </div>
                      <div className="flex justify-between text-sm p-2 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Order ORD-002</span>
                        <span className="font-medium text-secondary">+18 pts</span>
                      </div>
                      <div className="flex justify-between text-sm p-2 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Order ORD-003</span>
                        <span className="font-medium text-secondary">+32 pts</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Language Toggle */}
                {id === 'language' && (
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-3">Select your preferred language</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setLanguage('en')}
                        className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                          language === 'en'
                            ? 'bg-primary text-white shadow-orange'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        🇬🇧 English
                      </button>
                      <button
                        onClick={() => setLanguage('hi')}
                        className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                          language === 'hi'
                            ? 'bg-primary text-white shadow-orange'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        🇮🇳 हिंदी
                      </button>
                    </div>
                    {language === 'hi' && (
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        हिंदी भाषा चुनी गई है। मुख्य लेबल हिंदी में दिखेंगे।
                      </p>
                    )}
                  </div>
                )}

                {/* Help & Support */}
                {id === 'support' && (
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      {FAQ_ITEMS.map((faq, idx) => (
                        <div key={idx} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-3 text-left"
                          >
                            <span className="text-xs font-semibold text-foreground pr-2">{faq.q}</span>
                            <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-90' : ''}`} />
                          </button>
                          {expandedFaq === idx && (
                            <div className="px-3 pb-3">
                              <p className="text-xs text-muted-foreground">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Live Chat */}
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="w-full flex items-center gap-2 bg-secondary/10 text-secondary font-semibold text-sm py-3 rounded-xl justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {showChat ? 'Close Chat' : 'Chat with Support'}
                    </button>

                    {showChat && (
                      <div className="mt-3 border border-border rounded-xl overflow-hidden">
                        <div className="bg-secondary/10 px-3 py-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-secondary">Live Support</span>
                          <button onClick={() => setShowChat(false)}>
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <div className="h-40 overflow-y-auto p-3 space-y-2 bg-muted/20">
                          {chatMessages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] text-xs px-3 py-2 rounded-xl ${
                                msg.from === 'user'
                                  ? 'bg-primary text-white rounded-br-none'
                                  : 'bg-white text-foreground border border-border rounded-bl-none'
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 p-2 border-t border-border bg-white">
                          <input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                            placeholder="Type a message..."
                            className="flex-1 text-xs outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                          />
                          <button
                            onClick={handleSendChat}
                            className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"
                          >
                            <Send className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
