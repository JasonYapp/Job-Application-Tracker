import { Outlet, useLocation } from 'react-router';
import Navbar from "../components/navbar/navbar";
import Footer from '../components/footer/footer';

export default function Layout() {

  const location = useLocation();
  
  // Define which pages should show the footer
  const pagesWithFooter = ['/', '/about', '/features']; // Add your desired pages
  
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


