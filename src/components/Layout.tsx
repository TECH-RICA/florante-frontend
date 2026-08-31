import { Outlet, useLocation } from "react-router-dom";
import { isHeroPath } from "../lib/hero";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const location = useLocation();
  const hero = isHeroPath(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className={`flex-1 ${hero ? "" : "pt-[4.5rem]"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}