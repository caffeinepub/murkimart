import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import CartBottomBar from '@/components/layout/CartBottomBar';
import Home from '@/pages/Home';
import ProductCatalog from '@/pages/ProductCatalog';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import OrderTracking from '@/pages/OrderTracking';
import Profile from '@/pages/Profile';
import AdminPanel from '@/pages/admin/AdminPanel';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentFailure from '@/pages/PaymentFailure';
import { Toaster } from '@/components/ui/sonner';

type Page =
  | 'home'
  | 'catalog'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'profile'
  | 'admin'
  | 'payment-success'
  | 'payment-failure';

const PAGES_WITH_BOTTOM_NAV: Page[] = ['home', 'catalog', 'cart', 'profile'];
const PAGES_WITH_CART_BAR: Page[] = ['home', 'catalog'];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  // Check for admin route via hash
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#/admin' || window.location.pathname === '/admin') {
      setCurrentPage('admin');
    }
    if (hash === '#/payment-success' || window.location.pathname === '/payment-success') {
      setCurrentPage('payment-success');
    }
    if (hash === '#/payment-failure' || window.location.pathname === '/payment-failure') {
      setCurrentPage('payment-failure');
    }
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBottomNav = (tab: string) => {
    navigate(tab as Page);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate('catalog');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) navigate('catalog');
  };

  const handleOrderPlaced = (orderId: string) => {
    setCurrentOrderId(orderId);
    navigate('order-confirmation');
  };

  const showBottomNav = PAGES_WITH_BOTTOM_NAV.includes(currentPage);
  const showCartBar = PAGES_WITH_CART_BAR.includes(currentPage);
  const showHeader = !['admin', 'payment-success', 'payment-failure', 'order-confirmation'].includes(currentPage);

  const activeTab = PAGES_WITH_BOTTOM_NAV.includes(currentPage) ? currentPage : '';

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      {showHeader && <Header />}

      <main className={`${showHeader ? '' : ''} ${showBottomNav ? 'pb-16' : ''}`}>
        {currentPage === 'home' && (
          <Home
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
            onNavigate={(page) => navigate(page as Page)}
          />
        )}

        {currentPage === 'catalog' && (
          <ProductCatalog
            initialCategory={selectedCategory}
            initialSearch={searchQuery}
          />
        )}

        {currentPage === 'cart' && (
          <Cart
            onCheckout={() => navigate('checkout')}
            onContinueShopping={() => navigate('home')}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout
            onOrderPlaced={handleOrderPlaced}
            onBack={() => navigate('cart')}
          />
        )}

        {currentPage === 'order-confirmation' && currentOrderId && (
          <OrderConfirmation
            orderId={currentOrderId}
            onTrackOrder={() => navigate('order-tracking')}
            onContinueShopping={() => navigate('home')}
          />
        )}

        {currentPage === 'order-tracking' && currentOrderId && (
          <OrderTracking
            orderId={currentOrderId}
            onBack={() => navigate('home')}
          />
        )}

        {currentPage === 'profile' && (
          <Profile
            onNavigate={(page) => navigate(page as Page)}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPanel onBack={() => navigate('home')} />
        )}

        {currentPage === 'payment-success' && (
          <PaymentSuccess onContinue={() => navigate('home')} />
        )}

        {currentPage === 'payment-failure' && (
          <PaymentFailure
            onRetry={() => navigate('checkout')}
            onBack={() => navigate('cart')}
          />
        )}
      </main>

      {showCartBar && (
        <CartBottomBar onCheckout={() => navigate('cart')} />
      )}

      {showBottomNav && (
        <BottomNavigation
          currentPage={activeTab}
          onNavigate={handleBottomNav}
        />
      )}

      <Toaster />
    </div>
  );
}
