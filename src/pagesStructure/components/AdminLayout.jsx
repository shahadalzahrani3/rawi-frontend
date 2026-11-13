import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="app-layout">
      <AdminSidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;