import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <WishlistProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </WishlistProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

export default App;
