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

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout, updateUser }),
    [user, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
