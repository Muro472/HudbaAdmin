import { Outlet } from "react-router-dom";

import { NavLink } from "react-router-dom";

import "../scss/pages/_main-admin-page.scss";

const isActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "main-admin-page__nav-linkActive" : "main-admin-page__nav-link";

export default function MainAdminPage() {
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
            Items
          </NavLink>

          <NavLink className={isActiveNavLink} to="/orders">
            Orders
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
