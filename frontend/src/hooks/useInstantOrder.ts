import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAddressStore } from '../lib/addressStore';
import { useOrderStore } from '../lib/orderStore';
import { useNavigationStore } from '../lib/navigationStore';
import { Product } from '../lib/products';

const WHATSAPP_NUMBER = '917348050803';

export function useInstantOrder() {
  const getFirstAddress = useAddressStore((s) => s.getFirstAddress);
  const createOrder = useOrderStore((s) => s.createOrder);
  const navigateTo = useNavigationStore((s) => s.navigateTo);

  const handleBuyNow = useCallback(
    (product: Product) => {
      const address = getFirstAddress();

      if (!address) {
        toast.error('No delivery address found', {
          description: 'Please add a delivery address in your Profile first.',
          duration: 4000,
        });
        return;
      }

      try {
        const addressText = [
          address.houseNumber,
          address.street,
          address.landmark,
          `${address.locality}, Jaunpur, UP`,
        ]
          .filter(Boolean)
          .join(', ');

        const subtotal = product.discountedPrice;
        const deliveryFee = 0; // Delivery is always free
        const total = subtotal;
        const savings = product.price > product.discountedPrice
          ? product.price - product.discountedPrice
          : 0;

        const orderId = createOrder({
          items: [{ product, quantity: 1 }],
          subtotal,
          deliveryFee,
          total,
          savings,
          couponDiscount: 0,
          address: addressText,
          paymentMethod: 'Cash on Delivery',
          status: 'confirmed',
        });

        const message = [
          `🛒 *New Order from MurkiMart!*`,
          `Order ID: #${orderId}`,
          ``,
          `*Item:*`,
          `  • ${product.name} x1 — ₹${product.discountedPrice}`,
          ``,
          `*Bill Summary:*`,
          `  Subtotal: ₹${subtotal}`,
          `  Delivery: FREE 🎉`,
          `  *Total: ₹${total}*`,
          ``,
          `*Delivery Address:*`,
          `  ${addressText}`,
          ``,
          `Payment: Cash on Delivery 💵`,
        ].join('\n');

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        toast.success('Order placed! 🎉', {
          description: 'Opening WhatsApp to confirm your order.',
          duration: 3000,
        });

        setTimeout(() => {
          if (navigateTo) {
            navigateTo('tracking');
          }
        }, 500);
      } catch {
        toast.error('Failed to place order', {
          description: 'Please try again.',
        });
      }
    },
    [getFirstAddress, createOrder, navigateTo]
  );

  return { handleBuyNow };
}
