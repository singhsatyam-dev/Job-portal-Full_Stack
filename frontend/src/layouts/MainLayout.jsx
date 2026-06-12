import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ alignItems: "stretch" }}>
      <Navbar />
      <main className="flex-1 relative z-10 w-full">
        <Outlet />
      </main>
      {!window.location.pathname.startsWith("/recruiter") && <Footer />}
    </div>
  );
};

export default MainLayout;
