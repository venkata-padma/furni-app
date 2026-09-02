import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const OrdersContext = createContext(null);
const STORAGE_KEY = 'furni-orders';

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore unavailable/corrupt storage */
  }
  return [];
}

/** Human-friendly order reference, e.g. FURNI-7Q3K8. */
function makeOrderNumber() {
  const seed = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `FURNI-${seed.slice(0, 5).padEnd(5, '0')}`;
}

// A demo storefront has no fulfilment backend, so orders advance on a timer
// purely so "My Orders" shows a believable lifecycle.
const STATUS_FLOW = ['Processing', 'Packed', 'Shipped', 'Delivered'];

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [orders]);

  const placeOrder = useCallback((draft) => {
    const order = {
      id: `${Date.now()}`,
      number: makeOrderNumber(),
      placedAt: new Date().toISOString(),
      status: STATUS_FLOW[0],
      items: draft.items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        image: i.image,
        quantity: i.quantity,
      })),
      subtotal: draft.subtotal,
      discount: draft.discount || 0,
      shipping: draft.shipping || 0,
      total: draft.total,
      couponCode: draft.couponCode || null,
      address: draft.address || null,
      payment: draft.payment || null,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const advanceStatus = useCallback((id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = STATUS_FLOW[STATUS_FLOW.indexOf(o.status) + 1];
        return next ? { ...o, status: next } : o;
      })
    );
  }, []);

  const cancelOrder = useCallback((id) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id && (o.status === 'Processing' || o.status === 'Packed')
          ? { ...o, status: 'Cancelled' }
          : o
      )
    );
  }, []);

  const clearOrders = useCallback(() => setOrders([]), []);

  const value = useMemo(
    () => ({ orders, count: orders.length, placeOrder, advanceStatus, cancelOrder, clearOrders }),
    [orders, placeOrder, advanceStatus, cancelOrder, clearOrders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider');
  return ctx;
}

export { STATUS_FLOW };
