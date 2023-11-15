import { Outlet } from "react-router-dom";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RouterLinks } from "../types/routerLinks.ts";

import "../scss/pages/_main-admin-page.scss";
import { useEffect } from "react";

const isActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "main-admin-page__nav-linkActive" : "main-admin-page__nav-link";

export default function MainAdminPage() {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(RouterLinks.ITEMS_PATH);
    }
  }, [location]);

  return (
    <>
      <nav className="main-admin-page__nav">
        <div className="main-admin-page__nav-logo">
          <img
            src="src/assets/logo.png"
            className="main-admin-page__nav-logo-main"
          />
        </div>

        <div className="main-admin-page__nav-main">
          <NavLink className={isActiveNavLink} to="/items">
            Produkt
          </NavLink>

          <NavLink className={isActiveNavLink} to="/orders">
            Objednávka
          </NavLink>
        </div>

        <div className="main-admin-page__nav-action"></div>
      </nav>

      <main className="main-admin-page__main">
        <Outlet />
      </main>
    </>
  );
}
