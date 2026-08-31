import AppRouter from './router/AppRouter';
import { CartProvider } from './context/CartContext';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
