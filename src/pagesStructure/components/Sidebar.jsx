import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white border-l h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        RAWI
      </h2>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard">
          لوحة التحكم
        </Link>

        <Link to="/books">
          مشاريعي
        </Link>

        <Link to="/upload">
          إضافة كتاب
        </Link>

        <Link to="/auditions">
          التسليمات
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;