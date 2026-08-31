import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { initialCartItems } from '../data/cartItems';

const CartContext = createContext(null);
const STORAGE_KEY = 'furni-cart';

// Demo coupon codes → discount rate.
const COUPONS = {
  FURNI10: 0.1,
  WELCOME5: 0.05,
};

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore unavailable/corrupt storage */
  }
  return initialCartItems;
}

/** Collapse repeated shop-grid ids ("nordic-chair-3") back to the base product id. */
function baseId(id) {
  return String(id).replace(/-\d+$/, '');
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialItems);
  const [coupon, setCoupon] = useState(null); // { code, rate }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    const id = baseId(product.id);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [
        ...prev,
        { id, name: product.name, price: product.price, image: product.image, quantity: qty },
      ];
    });
  }, []);

  const increase = useCallback(
    (id) =>
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
      ),
    []
  );

  const decrease = useCallback(
    (id) =>
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))
      ),
    []
  );

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);

  const clear = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code) => {
    const normalised = code.trim().toUpperCase();
    const rate = COUPONS[normalised];
    if (rate) {
      setCoupon({ code: normalised, rate });
      return true;
    }
    setCoupon(null);
    return false;
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const discount = useMemo(() => (coupon ? subtotal * coupon.rate : 0), [coupon, subtotal]);
  const total = subtotal - discount;

  const value = useMemo(
    () => ({
      items,
      addItem,
      increase,
      decrease,
      remove,
      clear,
      coupon,
      applyCoupon,
      subtotal,
      discount,
      total,
      count,
    }),
    [items, addItem, increase, decrease, remove, clear, coupon, applyCoupon, subtotal, discount, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
