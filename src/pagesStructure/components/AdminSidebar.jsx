import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-brand">RAWI</h2>

      <nav>

        <Link className={pathname === "/admin/dashboard" ? "active" : ""} to="/admin/dashboard">
          لوحة التحكم
        </Link>

        <Link className={pathname === "/admin/users" ? "active" : ""} to="/admin/users">
          حسابات المستخدمين
        </Link>

        <Link className={pathname === "/admin/book-approval" ? "active" : ""} to="/admin/book-approval">
          اعتماد الكتب
        </Link>

        <Link className={pathname === "/admin/book-visibility" ? "active" : ""} to="/admin/book-visibility">
          ظهور الإعلانات
        </Link>

        <Link className={pathname === "/admin/auditions" ? "active" : ""} to="/admin/auditions">
          مراقبة التجارب
        </Link>

        <Link className={pathname === "/admin/projects" ? "active" : ""} to="/admin/projects">
          المشاريع الجارية
        </Link>

        <Link className={pathname === "/admin/deliveries" ? "active" : ""} to="/admin/deliveries">
          التسليمات
        </Link>

        <Link className={pathname === "/admin/transactions" ? "active" : ""} to="/admin/transactions">
          المعاملات
        </Link>

        <Link className={pathname === "/admin/commission" ? "active" : ""} to="/admin/commission">
          عمولة المنصة
        </Link>

        <Link className={pathname === "/admin/profile" ? "active" : ""} to="/admin/profile">
          الملف الشخصي
        </Link>

      </nav>
    </aside>
  );
}

export default AdminSidebar;