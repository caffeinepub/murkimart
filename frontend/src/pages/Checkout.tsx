import React, { useState } from 'react';
import { MapPin, Plus, CreditCard, Smartphone, Banknote, ChevronRight, Check } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useAddressStore, Address } from '@/lib/addressStore';
import { useOrderStore } from '@/lib/orderStore';
import { useLanguageStore } from '@/lib/languageStore';

const LOCALITIES = [
  'Murki Bazar', 'Jaunpur Road', 'Station Area', 'Civil Lines', 'Sipah',
  'Olandganj', 'Muftiganj', 'Shahganj', 'Kerakat', 'Machhali Shahar',
];

interface CheckoutProps {
  onOrderPlaced: (orderId: string) => void;
  onBack: () => void;
}

export default function Checkout({ onOrderPlaced, onBack }: CheckoutProps) {
  const { items, getSubtotal, getSavings, getDeliveryFee, getTotal, couponCode, couponDiscount, clearCart } = useCartStore();
  const { addresses, selectedAddressId, setSelectedAddress, addAddress } = useAddressStore();
  const { createOrder } = useOrderStore();
  const { t } = useLanguageStore();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    houseNumber: '',
    street: '',
    landmark: '',
    locality: 'Murki Bazar',
    isDefault: false,
  });

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  const handleAddAddress = () => {
    if (!newAddress.houseNumber || !newAddress.street) return;
    addAddress(newAddress);
    setShowAddAddress(false);
    setNewAddress({ label: 'Home', houseNumber: '', street: '', landmark: '', locality: 'Murki Bazar', isDefault: false });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;
    setIsPlacingOrder(true);
    await new Promise(r => setTimeout(r, 1500));

    const orderId = createOrder({
      items,
      subtotal: getSubtotal(),
      deliveryFee: getDeliveryFee(),
      total: getTotal(),
      savings: getSavings(),
      couponDiscount,
      address: `${selectedAddress.houseNumber}, ${selectedAddress.street}, ${selectedAddress.locality}`,
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'confirmed',
    });

    clearCart();
    setIsPlacingOrder(false);
    onOrderPlaced(orderId);
  };

  return (
    <div className="pb-32">
      <div className="px-4 py-3 border-b border-border">
        <button onClick={onBack} className="text-sm text-primary font-medium mb-1">← Back to Cart</button>
        <h1 className="font-display font-bold text-lg text-foreground">Checkout</h1>
      </div>

      {/* Delivery Address */}
      <div className="px-4 mt-4">
        <h2 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Delivery Address
        </h2>

        <div className="space-y-2">
          {addresses.map(addr => (
            <button
              key={addr.id}
              onClick={() => setSelectedAddress(addr.id)}
              className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${
                selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-border bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded-full">{addr.label}</span>
                    {addr.isDefault && <span className="text-[10px] text-secondary font-medium">Default</span>}
                  </div>
                  <p className="text-sm text-foreground">{addr.houseNumber}, {addr.street}</p>
                  {addr.landmark && <p className="text-xs text-muted-foreground">{addr.landmark}</p>}
                  <p className="text-xs text-muted-foreground">{addr.locality}, Jaunpur, UP</p>
                </div>
                {selectedAddressId === addr.id && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}

          {!showAddAddress ? (
            <button
              onClick={() => setShowAddAddress(true)}
              className="w-full flex items-center gap-2 p-3 rounded-2xl border-2 border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-semibold">Add New Address</span>
            </button>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
              <h3 className="font-semibold text-sm text-foreground">New Address</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Label</label>
                  <select
                    value={newAddress.label}
                    onChange={e => setNewAddress(p => ({ ...p, label: e.target.value }))}
                    className="w-full bg-muted rounded-xl px-3 py-2 text-sm outline-none"
                  >
                    <option>Home</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">House/Flat No.</label>
                  <input
                    type="text"
                    value={newAddress.houseNumber}
                    onChange={e => setNewAddress(p => ({ ...p, houseNumber: e.target.value }))}
                    placeholder="e.g. 42B"
                    className="w-full bg-muted rounded-xl px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Street / Colony</label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={e => setNewAddress(p => ({ ...p, street: e.target.value }))}
                  placeholder="e.g. Gandhi Nagar"
                  className="w-full bg-muted rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Landmark</label>
                <input
                  type="text"
                  value={newAddress.landmark}
                  onChange={e => setNewAddress(p => ({ ...p, landmark: e.target.value }))}
                  placeholder="e.g. Near Post Office"
                  className="w-full bg-muted rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Locality</label>
                <select
                  value={newAddress.locality}
                  onChange={e => setNewAddress(p => ({ ...p, locality: e.target.value }))}
                  className="w-full bg-muted rounded-xl px-3 py-2 text-sm outline-none"
                >
                  {LOCALITIES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowAddAddress(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-medium">Cancel</button>
                <button onClick={handleAddAddress} className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-bold">Save Address</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Payment Method
        </h2>
        <div className="space-y-2">
          {[
            { id: 'upi', label: 'UPI / Google Pay / PhonePe', icon: Smartphone, desc: 'Pay instantly via UPI' },
            { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
            { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when order arrives' },
          ].map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id as typeof paymentMethod)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                paymentMethod === id ? 'border-primary bg-primary/5' : 'border-border bg-white'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === id ? 'bg-primary' : 'bg-muted'}`}>
                <Icon className={`w-5 h-5 ${paymentMethod === id ? 'text-white' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              {paymentMethod === id && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mx-4 mt-6 bg-white rounded-2xl border border-border p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Bill Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item Total</span>
            <span>₹{getSubtotal()}</span>
          </div>
          {getSavings() > 0 && (
            <div className="flex justify-between">
              <span className="text-secondary">Savings</span>
              <span className="text-secondary">-₹{getSavings()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            {getDeliveryFee() === 0 ? (
              <span className="text-secondary font-medium">FREE</span>
            ) : (
              <span>₹{getDeliveryFee()}</span>
            )}
          </div>
          {couponDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-secondary">Coupon ({couponCode})</span>
              <span className="text-secondary">-₹{couponDiscount}</span>
            </div>
          )}
          <div className="h-px bg-border" />
          <div className="flex justify-between font-bold">
            <span>To Pay</span>
            <span className="text-lg">₹{getTotal()}</span>
          </div>
        </div>
      </div>

      {/* Place Order */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2">
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedAddress || isPlacingOrder}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-orange flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPlacingOrder ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Placing Order...</span>
            </>
          ) : (
            <>
              <span>{t('placeOrder')} · ₹{getTotal()}</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
