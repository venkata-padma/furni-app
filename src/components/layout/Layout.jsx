import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useSectionReveal } from '../../hooks/useSectionReveal';

function Layout() {
  useSectionReveal();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
