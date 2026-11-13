import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./pagesStructure/components/Sidebar";
import Auditions from "./pagesStructure/pages/Auditions";
import AuthorDashboard from "./pagesStructure/pages/AuthorDashboard";
import MyBooks from "./pagesStructure/pages/MyBooks";
import UploadBooks from "./pagesStructure/pages/UploadBooks";
import AdminDashboard from "./pagesStructure/pages/admin/AdminDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<AuthorDashboard />} />
            <Route path="/books" element={<MyBooks />} />
            <Route path="/upload" element={<UploadBooks />} />
            <Route path="/auditions" element={<Auditions />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
