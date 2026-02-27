import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AdminPanel from './pages/admin/AdminPanel';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import FirstVisitModal from './components/onboarding/FirstVisitModal';
import { useNavigationStore } from './lib/navigationStore';
import { useAuthStore } from './lib/authStore';

type Page =
  | 'home'
  | 'catalog'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'order-confirmation'
  | 'profile'
  | 'login'
  | 'admin'
  | 'payment-success'
  | 'payment-failure';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageHistory, setPageHistory] = useState<Page[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  const setNavigateTo = useNavigationStore((s) => s.setNavigateTo);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // Show onboarding modal only when user is not logged in
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Wait for Zustand to rehydrate from localStorage before deciding to show modal
  useEffect(() => {
    // Small delay to allow Zustand persist to rehydrate
    const timer = setTimeout(() => {
      if (!useAuthStore.getState().isLoggedIn) {
        setShowOnboarding(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // If user logs in (e.g. via modal), hide the modal
  useEffect(() => {
    if (isLoggedIn) {
      setShowOnboarding(false);
    }
  }, [isLoggedIn]);

  const navigate = (page: Page, category?: string) => {
    setPageHistory(prev => [...prev, currentPage]);
    setCurrentPage(page);
    if (category !== undefined) setSelectedCategory(category);
  };

  const navigateStr = (page: string) => {
    navigate(page as Page);
  };

  const goBack = () => {
    if (pageHistory.length > 0) {
      const prev = pageHistory[pageHistory.length - 1];
      setPageHistory(h => h.slice(0, -1));
      setCurrentPage(prev);
    } else {
      setCurrentPage('home');
    }
  };

  // Register navigateStr in the store so hooks (e.g. useInstantOrder) can trigger navigation
  useEffect(() => {
    setNavigateTo(navigateStr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            onSearch={(query) => {
              if (query) navigate('catalog');
            }}
            onCategorySelect={(cat) => {
              setSelectedCategory(cat);
              navigate('catalog');
            }}
            onNavigate={navigateStr}
          />
        );
      case 'catalog':
        return (
          <ProductCatalog
            initialCategory={selectedCategory}
            onBack={goBack}
          />
        );
      case 'cart':
        return (
          <Cart
            onCheckout={() => navigate('checkout')}
            onContinueShopping={() => navigate('home')}
          />
        );
      case 'checkout':
        return (
          <Checkout
            onOrderPlaced={(orderId) => {
              setCurrentOrderId(orderId);
              navigate('order-confirmation');
            }}
            onBack={goBack}
          />
        );
      case 'order-confirmation':
        return (
          <OrderConfirmation
            orderId={currentOrderId}
            onTrackOrder={() => navigate('tracking')}
            onContinueShopping={() => navigate('home')}
          />
        );
      case 'tracking':
        return <OrderTracking onBack={goBack} />;
      case 'profile':
        return <Profile onNavigate={navigateStr} />;
      case 'login':
        return <Login onNavigate={navigateStr} />;
      case 'admin':
        return <AdminPanel onBack={goBack} />;
      case 'payment-success':
        return <PaymentSuccess onContinue={() => navigate('home')} />;
      case 'payment-failure':
        return (
          <PaymentFailure
            onRetry={() => navigate('checkout')}
            onBack={() => navigate('cart')}
          />
        );
      default:
        return (
          <Home
            onSearch={(query) => {
              if (query) navigate('catalog');
            }}
            onCategorySelect={(cat) => {
              setSelectedCategory(cat);
              navigate('catalog');
            }}
            onNavigate={navigateStr}
          />
        );
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster position="top-center" richColors />
      {showOnboarding && (
        <FirstVisitModal onClose={() => setShowOnboarding(false)} />
      )}
    </>
  );
}
