import { BrowserRouter, Navigate, Route, Routes , Outlet } from "react-router-dom";
import Sidebar from "./pagesStructure/components/Sidebar";
import Auditions from "./pagesStructure/pages/Auditions";
import AuthorDashboard from "./pagesStructure/pages/AuthorDashboard";
import MyBooks from "./pagesStructure/pages/MyBooks";
import UploadBooks from "./pagesStructure/pages/UploadBooks";
import AdminDashboard from "./pagesStructure/pages/admin/AdminDashboard";
import AdminLayout from "./pagesStructure/components/AdminLayout";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
