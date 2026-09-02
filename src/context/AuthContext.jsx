import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'furni-user';

// Communication preferences shown on the Notifications page. Order-related
// alerts default on; marketing defaults off.
export const DEFAULT_NOTIFICATIONS = {
  orderUpdates: true,
  deliveryAlerts: true,
  backInStock: false,
  promotions: false,
  newsletter: false,
};

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore unavailable/corrupt storage */
  }
  return null;
}

function normalise(details = {}) {
  return {
    firstName: (details.firstName || '').trim(),
    lastName: (details.lastName || '').trim(),
    email: (details.email || '').trim(),
    phone: (details.phone || '').trim(),
    address: (details.address || '').trim(),
    memberSince: details.memberSince || new Date().toISOString(),
    notifications: { ...DEFAULT_NOTIFICATIONS, ...(details.notifications || {}) },
    paymentMethods: Array.isArray(details.paymentMethods) ? details.paymentMethods : [],
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [user]);

  // No backend — "logging in" just captures the details the user typed.
  const login = useCallback((details) => setUser(normalise(details)), []);

  const updateUser = useCallback(
    (patch) => setUser((prev) => normalise({ ...prev, ...patch })),
    []
  );

  const setNotifications = useCallback(
    (patch) =>
      setUser((prev) =>
        normalise({ ...prev, notifications: { ...prev?.notifications, ...patch } })
      ),
    []
  );

  const addPaymentMethod = useCallback((method) => {
    setUser((prev) => {
      const existing = prev?.paymentMethods || [];
      const card = {
        id: `pm-${Date.now()}`,
        addedAt: new Date().toISOString(),
        ...method,
      };
      // First card added becomes the default automatically.
      const isDefault = existing.length === 0 || method.default;
      const next = isDefault
        ? [{ ...card, default: true }, ...existing.map((m) => ({ ...m, default: false }))]
        : [...existing, card];
      return normalise({ ...prev, paymentMethods: next });
    });
  }, []);

  const removePaymentMethod = useCallback((id) => {
    setUser((prev) => {
      const remaining = (prev?.paymentMethods || []).filter((m) => m.id !== id);
      // Keep a default around if any cards remain.
      if (remaining.length && !remaining.some((m) => m.default)) {
        remaining[0] = { ...remaining[0], default: true };
      }
      return normalise({ ...prev, paymentMethods: remaining });
    });
  }, []);

  const setDefaultPaymentMethod = useCallback((id) => {
    setUser((prev) =>
      normalise({
        ...prev,
        paymentMethods: (prev?.paymentMethods || []).map((m) => ({
          ...m,
          default: m.id === id,
        })),
      })
    );
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const deleteAccount = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('furni-orders');
      localStorage.removeItem('furni-wishlist');
      localStorage.removeItem('furni-cart');
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateUser,
      setNotifications,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod,
      deleteAccount,
    }),
    [
      user,
      login,
      logout,
      updateUser,
      setNotifications,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod,
      deleteAccount,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
