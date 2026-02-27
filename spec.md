# Specification

## Summary
**Goal:** Build MurkiMart, a hyperlocal quick commerce web app (Blinkit-style) for Murki Jaunpur, with a full product catalog, cart, checkout, order tracking, user profile, and an admin panel — all using a vibrant orange (#F97316) and green (#16A34A) theme.

**Planned changes:**

### Frontend
- Apply MurkiMart branding with orange/green theme, bold sans-serif typography, and a "Delivery in 10-15 mins" promise badge on the home screen
- Bottom navigation bar with 4 tabs: Home, Categories, Cart (with live item count badge), Profile; active tab highlighted in orange
- **Home Feed screen:** auto-scrolling promotional banner carousel, "MurkiMart Now" quick-add section for top 20 essentials, horizontal scrollable category tiles (8 categories), and a Flash Deals section with countdown timers; sticky search bar at top
- **Product Catalog screen:** 2-column grid with product image, name, weight/quantity, MRP (strikethrough), discounted price, discount % badge, star rating, and Add/+/- quantity selector; out-of-stock state; filter panel (price range, brand, veg/non-veg, category); search with autocomplete
- **Cart:** sticky bottom bar on all non-checkout screens showing item count, subtotal, and savings; full cart screen with quantity controls, item removal, delivery fee logic (free above ₹199, else ₹25–₹50), coupon/promo code input, and order summary
- **Checkout screen:** saved addresses (pre-populated Murki Jaunpur localities), add new address form (house number, street, landmark, locality dropdown), payment method selection (UPI with mock GPay/PhonePe icons, Card, COD), Place Order button leading to confirmation screen with order ID and 10–15 min ETA
- **Order Tracking screen:** 5-step status timeline (Order Confirmed → Being Prepared → Picked Up → Out for Delivery → Delivered) with checkmarks, rider name and avatar, live-countdown ETA timer, animated progress bar, and order summary at bottom
- **User Profile screen:** saved addresses (edit/delete), order history (3+ mock past orders), loyalty points balance (points-to-rupees display), English/Hindi language toggle for key UI labels, Help & Support with FAQ and mock chat UI
- **Admin Panel at /admin:** sidebar navigation; dashboard with 4 metric cards (Orders Today, Revenue Today, Active Riders, Items Out of Stock); product management table with inline price/stock editing; orders list with status change controls; analytics charts (orders by hour, top products, category revenue)

### Backend (Motoko stable variables)
- Product data model: id, name, category, subcategory, brand, images, mrp, discountedPrice, discountPercent, weightOrQuantity, rating, reviewCount, isVeg, isInStock, tags, inventoryCount — pre-populated with 50+ sample products across 8 categories with Indian product names, brands, and INR prices
- Query functions: `getAllProducts` (paginated), `getProductsByCategory`, `searchProducts(query)`, `getProductById`
- Order functions: `createOrder`, `getOrderById`, `getUserOrders`, `updateOrderStatus`
- User functions: `getOrCreateUser`, `getUserAddresses`, `addAddress`, `deleteAddress`
- Loyalty functions: `addPoints`, `getPoints`
- Admin stats: `getOrderStats`, `getTopProducts`, `getHourlyOrderCounts`
- All state stored in stable variables in a single backend actor

### Constraints
- All payments, GPS tracking, push notifications, and voice search are simulated/mock UI only
- No real authentication; anonymous session assumed

**User-visible outcome:** Users can browse the MurkiMart product catalog, add items to cart, checkout with a mock address and payment, track their order through a simulated delivery timeline, and manage their profile and order history. Store managers can access the /admin panel to view metrics, update products and orders, and review analytics.
