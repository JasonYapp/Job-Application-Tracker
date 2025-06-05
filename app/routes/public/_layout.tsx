import { Outlet } from "react-router";
import Navbar from "../../components/navbar/navbar";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}


