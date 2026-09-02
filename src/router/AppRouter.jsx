import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import About from '../pages/About';
import Services from '../pages/Services';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Account from '../pages/Account';
import AccountProfile from '../pages/account/Profile';
import AccountOrders from '../pages/account/Orders';
import AccountAddress from '../pages/account/Address';
import AccountPayment from '../pages/account/Payment';
import AccountWishlist from '../pages/account/Wishlist';
import AccountNotifications from '../pages/account/Notifications';
import AccountSecurity from '../pages/account/Security';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'blog', element: <Blog /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      {
        path: 'account',
        element: <Account />,
        children: [
          { index: true, element: <Navigate to="/account/profile" replace /> },
          { path: 'profile', element: <AccountProfile /> },
          { path: 'orders', element: <AccountOrders /> },
          { path: 'wishlist', element: <AccountWishlist /> },
          { path: 'address', element: <AccountAddress /> },
          { path: 'payment', element: <AccountPayment /> },
          { path: 'notifications', element: <AccountNotifications /> },
          { path: 'security', element: <AccountSecurity /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
