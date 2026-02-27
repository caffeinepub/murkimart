import React, { useState } from 'react';
import { BarChart3, Package, ShoppingBag, LayoutDashboard, ArrowLeft, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/products';
import { useOrderStore } from '@/lib/orderStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type AdminSection = 'dashboard' | 'products' | 'orders' | 'analytics';

interface AdminPanelProps {
  onBack: () => void;
}

const HOURLY_DATA = Array.from({ length: 24 }, (_, h) => ({
  hour: `${h}:00`,
  orders: Math.floor(Math.random() * 20) + (h >= 8 && h <= 22 ? 10 : 2),
}));

const CATEGORY_REVENUE = [
  { name: 'Dairy', value: 4200, color: '#16a34a' },
  { name: 'Snacks', value: 3100, color: '#f97316' },
  { name: 'Fruits', value: 2800, color: '#eab308' },
  { name: 'Personal', value: 2200, color: '#3b82f6' },
  { name: 'Pharmacy', value: 1800, color: '#ef4444' },
  { name: 'Household', value: 1500, color: '#8b5cf6' },
];

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const { orders, updateOrderStatus } = useOrderStore();
  const [products, setProducts] = useState(ALL_PRODUCTS.map(p => ({ ...p, editPrice: p.discountedPrice, editStock: p.isInStock ? 50 : 0 })));

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const todayOrders = orders.filter(o => {
    const today = new Date();
    return o.createdAt.toDateString() === today.toDateString();
  }).length;
  const outOfStock = ALL_PRODUCTS.filter(p => !p.isInStock).length;

  const navItems = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as AdminSection, label: 'Products', icon: Package },
    { id: 'orders' as AdminSection, label: 'Orders', icon: ShoppingBag },
    { id: 'analytics' as AdminSection, label: 'Analytics', icon: BarChart3 },
  ];

  const STATUS_OPTIONS = ['confirmed', 'preparing', 'picked_up', 'out_for_delivery', 'delivered'] as const;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Admin Header */}
      <div className="bg-foreground text-background px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-base">MurkiMart Admin</h1>
          <p className="text-xs opacity-60">Store Manager Panel</p>
        </div>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">A</span>
        </div>
      </div>

      {/* Bottom Nav for Admin */}
      <div className="flex bg-white border-b border-border overflow-x-auto scrollbar-hide">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 min-w-[70px] transition-all ${
              activeSection === id
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-8">
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-base text-foreground">Dashboard Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Orders Today', value: todayOrders || 3, icon: ShoppingBag, color: 'bg-primary/10 text-primary' },
                { label: 'Revenue Today', value: `₹${(totalRevenue || 759).toLocaleString()}`, icon: TrendingUp, color: 'bg-secondary/10 text-secondary' },
                { label: 'Active Riders', value: 4, icon: Users, color: 'bg-blue-100 text-blue-600' },
                { label: 'Out of Stock', value: outOfStock, icon: AlertCircle, color: 'bg-red-100 text-red-600' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-border p-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-display font-bold text-xl text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Recent Orders</h3>
              <div className="space-y-2">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₹{order.total}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'delivered' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeSection === 'products' && (
          <div className="space-y-3">
            <h2 className="font-display font-bold text-base text-foreground">Product Management</h2>
            <p className="text-xs text-muted-foreground">{products.length} products · Tap to edit price/stock</p>
            {products.map((product, idx) => (
              <div key={product.id} className="bg-white rounded-2xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand} · {product.weightOrQuantity}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${product.isInStock ? 'bg-secondary' : 'bg-destructive'}`} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={product.editPrice}
                      onChange={e => setProducts(prev => prev.map((p, i) => i === idx ? { ...p, editPrice: Number(e.target.value) } : p))}
                      className="w-full bg-muted rounded-lg px-2 py-1.5 text-sm outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">Stock (units)</label>
                    <input
                      type="number"
                      value={product.editStock}
                      onChange={e => setProducts(prev => prev.map((p, i) => i === idx ? { ...p, editStock: Number(e.target.value) } : p))}
                      className="w-full bg-muted rounded-lg px-2 py-1.5 text-sm outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders */}
        {activeSection === 'orders' && (
          <div className="space-y-3">
            <h2 className="font-display font-bold text-base text-foreground">All Orders</h2>
            <p className="text-xs text-muted-foreground">{orders.length} total orders</p>
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {order.paymentMethod}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.address}</p>
                  </div>
                  <p className="font-bold text-foreground">₹{order.total}</p>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1">Update Status</label>
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value as typeof order.status)}
                    className="w-full bg-muted rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics */}
        {activeSection === 'analytics' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-base text-foreground">Analytics</h2>

            {/* Peak Hours */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Orders by Hour (Peak Hours)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={HOURLY_DATA.filter((_, i) => i % 2 === 0)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Top Selling Products</h3>
              <div className="space-y-2">
                {ALL_PRODUCTS.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5).map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4">#{idx + 1}</span>
                    <span className="text-lg">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${(p.reviewCount / ALL_PRODUCTS[0].reviewCount) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-foreground">{(p.reviewCount / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Revenue */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">Category Revenue (₹)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={CATEGORY_REVENUE}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {CATEGORY_REVENUE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
