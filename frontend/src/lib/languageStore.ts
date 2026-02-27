import { create } from 'zustand';

type Language = 'en' | 'hi';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  home: { en: 'Home', hi: 'होम' },
  categories: { en: 'Categories', hi: 'श्रेणियाँ' },
  cart: { en: 'Cart', hi: 'कार्ट' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल' },
  search: { en: 'Search for groceries, snacks...', hi: 'किराना, स्नैक्स खोजें...' },
  addToCart: { en: 'Add', hi: 'जोड़ें' },
  outOfStock: { en: 'Out of Stock', hi: 'स्टॉक में नहीं' },
  deliveryIn: { en: 'Delivery in', hi: 'डिलीवरी' },
  minutes: { en: 'mins', hi: 'मिनट' },
  checkout: { en: 'Checkout', hi: 'चेकआउट' },
  placeOrder: { en: 'Place Order', hi: 'ऑर्डर करें' },
  orderConfirmed: { en: 'Order Confirmed!', hi: 'ऑर्डर कन्फर्म!' },
  flashDeals: { en: 'Flash Deals', hi: 'फ्लैश डील्स' },
  quickEssentials: { en: 'MurkiMart Now', hi: 'मुर्की मार्ट अभी' },
  freeDelivery: { en: 'Free delivery above ₹199', hi: '₹199 से ऊपर मुफ्त डिलीवरी' },
  savings: { en: 'Savings', hi: 'बचत' },
  total: { en: 'Total', hi: 'कुल' },
  deliveryFee: { en: 'Delivery Fee', hi: 'डिलीवरी शुल्क' },
  orderHistory: { en: 'Order History', hi: 'ऑर्डर इतिहास' },
  savedAddresses: { en: 'Saved Addresses', hi: 'सहेजे पते' },
  loyaltyPoints: { en: 'Loyalty Points', hi: 'लॉयल्टी पॉइंट्स' },
  helpSupport: { en: 'Help & Support', hi: 'सहायता' },
  language: { en: 'Language', hi: 'भाषा' },
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (key: string) => {
    const lang = get().language;
    return translations[key]?.[lang] || key;
  },
}));
