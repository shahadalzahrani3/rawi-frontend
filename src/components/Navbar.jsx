
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header" dir="rtl">

      {/* Rawi Logo */}
      <Link to="/" className="brand">
        <strong>راوي</strong>
        <small>R A W I</small>
      </Link>

      {/* Navigation Links */}
      <nav className="primary-nav">

        <NavLink to="/" end>
          الرئيسية
        </NavLink>

        <NavLink to="/register">
          إنشاء حساب
        </NavLink>

        <NavLink to="/login">
          تسجيل الدخول
        </NavLink>

      </nav>

      {/* Login and Register Buttons */}
      <div className="header-actions">

        <Link
          to="/login"
          className="button button-outline"
        >
          تسجيل الدخول
        </Link>

        <Link
          to="/register"
          className="button button-dark"
        >
          إنشاء حساب
        </Link>

      </div>

    </header>
  );
}

export default Navbar;
