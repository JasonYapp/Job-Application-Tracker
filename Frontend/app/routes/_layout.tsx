import { Outlet, useLocation } from 'react-router';
import Navbar from "../components/navbar/navbar";
import Footer from '../components/footer/footer';

export default function Layout() {

  const location = useLocation();
  
  const pagesWithFooter = ['/', '/about', '/features']; 
  
  const showFooter = pagesWithFooter.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
}


