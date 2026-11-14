import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("rawiDemoUser");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-brand">RAWI</h2>
      <nav aria-label="التنقل الرئيسي">
        <Link className={pathname === "/dashboard" ? "active" : ""} to="/dashboard">
          لوحة التحكم
        </Link>
        <Link className={pathname === "/books" ? "active" : ""} to="/books">
          مشاريعي
        </Link>
        <Link className={pathname === "/profile" ? "active" : ""} to="/profile">
          الملف الشخصي
        </Link>
        <Link className={pathname === "/upload" ? "active" : ""} to="/upload">
          إضافة كتاب
        </Link>
        <Link className={pathname === "/auditions" ? "active" : ""} to="/auditions">
          التسليمات
        </Link>
      </nav>
      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        تسجيل الخروج
      </button>
    </aside>
  );
}

export default Sidebar;