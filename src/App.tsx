import { useEffect, useState } from 'react';
import {
  CurrencyCode,
  OrderRecord,
  PackageCategory,
  PaymentMethodId,
  UcPackage,
} from '@/src/data/ucPackages';
import { LiquidBackground } from '@/src/components/LiquidBackground';
import { Header } from '@/src/components/Header';
import { Hero } from '@/src/components/Hero';
import { CatalogSection } from '@/src/components/CatalogSection';
import { PaymentAndGuideSection } from '@/src/components/PaymentAndGuideSection';
import { CartDrawer, CartItem } from '@/src/components/CartDrawer';
import { Footer } from '@/src/components/Footer';

const ORDERS_STORAGE_KEY = 'karimov_uc_orders_v1';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('TJS');
  const [category, setCategory] = useState<PackageCategory>('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('dc');
  const [playerId, setPlayerId] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as OrderRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentOrders]);

  const handleAddToCart = (pkg: UcPackage) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.pkg.id === pkg.id);
      if (existing) {
        return prev.map((item) =>
          item.pkg.id === pkg.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { pkg, quantity: 1 }];
    });
    setRecentlyAddedId(pkg.id);
    setTimeout(() => {
      setRecentlyAddedId((current) => (current === pkg.id ? null : current));
    }, 1200);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (packageId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.pkg.id === packageId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (packageId: string) => {
    setCartItems((prev) => prev.filter((item) => item.pkg.id !== packageId));
  };

  const handleOrderConfirmed = (order: OrderRecord) => {
    setRecentOrders((prev) => [order, ...prev].slice(0, 5));
    setCartItems([]);
  };

  const handleJumpToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen flex flex-col text-[#F4F5F7]">
      <LiquidBackground />

      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <Hero
          playerId={playerId}
          onPlayerIdChange={setPlayerId}
          onJumpToCatalog={handleJumpToCatalog}
        />

        <CatalogSection
          currency={currency}
          onCurrencyChange={setCurrency}
          category={category}
          onCategoryChange={setCategory}
          onAddToCart={handleAddToCart}
          recentlyAddedId={recentlyAddedId}
        />

        <PaymentAndGuideSection
          selectedPayment={selectedPayment}
          onSelectPayment={setSelectedPayment}
          recentOrders={recentOrders}
        />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        playerId={playerId}
        onPlayerIdChange={setPlayerId}
        selectedPayment={selectedPayment}
        onSelectPayment={setSelectedPayment}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderConfirmed={handleOrderConfirmed}
      />
    </div>
  );
}
