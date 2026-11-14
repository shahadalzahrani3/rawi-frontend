import { NavLink } from "react-router-dom";

const links = [
  { to: "/narrator/dashboard", label: "لوحة التحكم" },
  { to: "/narrator/projects", label: "تصفح المشاريع" },
  { to: "/narrator/auditions", label: "تجارب الأداء" },
  { to: "/narrator/my-projects", label: "مشاريعي" },
  { to: "/narrator/samples", label: "عينات الصوت" },
  { to: "/narrator/payments", label: "المدفوعات" },
  { to: "/narrator/profile", label: "الملف الشخصي" }
];

function NarratorSidebar() {
  return (
    <aside className="nr-sidebar">
      <p className="nr-sidebar-label">مساحة راوٍ</p>

      <nav className="nr-sidebar-nav" aria-label="قائمة الراوي">
        {links.map((link, index) => (
          <NavLink key={link.to} to={link.to}>
            <span className="nr-sidebar-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nr-help">
        <strong>تحتاج مساعدة؟</strong>
        <p>راجع دليل استخدام المنصة أو تواصل مع الدعم.</p>
        <a href="mailto:support@rawi.sa">فتح مركز المساعدة</a>
      </div>
    </aside>
  );
}

export default NarratorSidebar;