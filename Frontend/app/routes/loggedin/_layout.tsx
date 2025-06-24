import { Outlet, useLocation, useNavigate } from 'react-router';
import DashNav from "../../components/dashNav/dashNav";
import { useEffect, useState } from 'react';

export default function loggedInLayout() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  
  return (
    <>
      <DashNav />
      <main>
        <Outlet />
      </main>
      
    </>
  );
}


