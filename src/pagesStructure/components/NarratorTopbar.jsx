import { Link, NavLink, useNavigate } from "react-router-dom";

function NarratorTopbar({ name, notificationCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("rawiDemoUser");
    navigate("/login");
  };

  return (
    <header className="nr-topbar">
      <Link to="/" className="brand">
        <strong>راوي</strong>
        <small>R A W I</small>
      </Link>

      <nav className="nr-topbar-links" aria-label="الروابط الرئيسية">
        <NavLink to="/" end>الرئيسية</NavLink>
        <NavLink to="/narrator/projects">المشاريع</NavLink>
        <NavLink to="/narrator/profile">الملف الشخصي</NavLink>
      </nav>

      <div className="nr-topbar-user">
        <Link
          to="/narrator/dashboard"
          className="nr-circle"
          aria-label={`${notificationCount} تنبيهات`}
        >
          {notificationCount}
        </Link>
        <span className="nr-circle nr-avatar" aria-hidden="true">
          {name.trim().charAt(0)}
        </span>
        <strong className="nr-user-name">{name}</strong>
        <button type="button" className="nr-logout" onClick={handleLogout}>
          خروج
        </button>
      </div>
    </header>
  );
}

export default NarratorTopbar;