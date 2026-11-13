import { BrowserRouter, Navigate, Route, Routes , Outlet } from "react-router-dom";
import Sidebar from "./pagesStructure/components/Sidebar";
import Auditions from "./pagesStructure/pages/Auditions";
import AuthorDashboard from "./pagesStructure/pages/AuthorDashboard";
import MyBooks from "./pagesStructure/pages/MyBooks";
import UploadBooks from "./pagesStructure/pages/UploadBooks";
import AdminDashboard from "./pagesStructure/pages/admin/AdminDashboard";
import AdminLayout from "./pagesStructure/components/AdminLayout";
import AdminUsers from "./pagesStructure/pages/admin/AdminUsers";
import AdminBooks from "./pagesStructure/pages/admin/AdminBooks";
import AdminBookVisibility from "./pagesStructure/pages/admin/AdminBookVisibility";
import AdminAuditions from "./pagesStructure/pages/admin/AdminAuditions";
import AdminProjects from "./pagesStructure/pages/admin/AdminProjects";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Author pages */}
        <Route
          element={
            <div className="app-layout">
              <Sidebar />
              <main>
                <Outlet />
              </main>
            </div>
          }
        >
          <Route path="/dashboard" element={<AuthorDashboard />} />
          <Route path="/books" element={<MyBooks />} />
          <Route path="/upload" element={<UploadBooks />} />
          <Route path="/auditions" element={<Auditions />} />
        </Route>
        {/* Admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="book-approval" element={<AdminBooks />} />
          <Route path="book-visibility" element={<AdminBookVisibility />} />
          <Route path="auditions" element={<AdminAuditions />} />
          <Route path="projects" element={<AdminProjects />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
