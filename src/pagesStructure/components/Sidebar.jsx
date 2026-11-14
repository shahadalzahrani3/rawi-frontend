import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

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
        <Link className={pathname === "/upload" ? "active" : ""} to="/upload">
          إضافة كتاب
        </Link>
        <Link className={pathname === "/auditions" ? "active" : ""} to="/auditions">
          التسليمات
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;