import { Outlet, useLocation } from 'react-router';
import DashNav from "../../components/dashNav/dashNav";

export default function loggedInLayout() {

  return (
    <>
      <DashNav />
      <main>
        <Outlet />
      </main>
      
    </>
  );
}


