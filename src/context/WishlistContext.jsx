import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'furni-wishlist';

/** Collapse repeated shop-grid ids ("nordic-chair-3") back to the base product id. */
function baseId(id) {
  return String(id).replace(/-\d+$/, '');
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore unavailable/corrupt storage */
  }
  return [];
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadItems);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const has = useCallback(
    (id) => items.some((i) => i.id === baseId(id)),
    [items]
  );

  const add = useCallback((product) => {
    const id = baseId(product.id);
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev
        : [
            { id, name: product.name, price: product.price, image: product.image, addedAt: Date.now() },
            ...prev,
          ]
    );
  }, []);

  const remove = useCallback(
    (id) => setItems((prev) => prev.filter((i) => i.id !== baseId(id))),
    []
  );

  const toggle = useCallback((product) => {
    const id = baseId(product.id);
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.filter((i) => i.id !== id)
        : [
            { id, name: product.name, price: product.price, image: product.image, addedAt: Date.now() },
            ...prev,
          ]
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, has, add, remove, toggle, clear }),
    [items, has, add, remove, toggle, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
