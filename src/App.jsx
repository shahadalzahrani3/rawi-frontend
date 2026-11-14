import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useParams,
  useNavigate
} from "react-router-dom";

// Shahad - Homepage and Authentication
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  Activate,
  ForgotPassword
} from "./pages/AccountHelp";

// Author Pages
import Sidebar from "./pagesStructure/components/Sidebar";
import Auditions from "./pagesStructure/pages/Auditions";
import AuthorDashboard from "./pagesStructure/pages/AuthorDashboard";
import MyBooks from "./pagesStructure/pages/MyBooks";
import Profile from "./pagesStructure/pages/Profile";
import UploadBooks from "./pagesStructure/pages/UploadBooks";

// Admin Pages
import AdminDashboard from "./pagesStructure/pages/admin/AdminDashboard";
import AdminLayout from "./pagesStructure/components/AdminLayout";
import AdminUsers from "./pagesStructure/pages/admin/AdminUsers";
import AdminBooks from "./pagesStructure/pages/admin/AdminBooks";
import AdminBookVisibility from "./pagesStructure/pages/admin/AdminBookVisibility";
import AdminAuditions from "./pagesStructure/pages/admin/AdminAuditions";
import AdminProjects from "./pagesStructure/pages/admin/AdminProjects";
import AdminDeliveries from "./pagesStructure/pages/admin/AdminDeliveries";
import AdminTransactions from "./pagesStructure/pages/admin/AdminTransactions";
import AdminCommission from "./pagesStructure/pages/admin/AdminCommission";
import AdminProfile from "./pagesStructure/pages/admin/AdminProfile";

// Narrator Pages
import NarratorLayout from "./pagesStructure/components/NarratorLayout";
import NarratorDashboard from "./pagesStructure/pages/narrator/NarratorDashboard";
import NarratorProfile from "./pagesStructure/pages/narrator/NarratorProfile";
import VoiceSamples from "./pagesStructure/pages/narrator/VoiceSamples";
import BrowseProjects from "./pagesStructure/pages/narrator/BrowseProjects";
import ProjectDetails from "./pagesStructure/pages/narrator/ProjectDetails";
import MyAuditions from "./pagesStructure/pages/narrator/MyAuditions";
import MyProjects from "./pagesStructure/pages/narrator/MyProjects";
import ProjectWork from "./pagesStructure/pages/narrator/ProjectWork";
import Payments from "./pagesStructure/pages/narrator/Payments";

import "./App.css";

// Layout for public pages
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// Layout for Author pages
function AuthorLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Temporary Narrator Dashboard
function DashboardPreview() {
  const { role } = useParams();
  const navigate = useNavigate();

  const session = JSON.parse(
    sessionStorage.getItem("rawiDemoUser") || "null"
  );

  if (!session || session.role !== role) {
    return (
      <main className="utility-page" dir="rtl">
        <section className="utility-card">
          <h1>يرجى تسجيل الدخول أولاً</h1>

          <Link to="/login" className="button button-dark">
            تسجيل الدخول
          </Link>
        </section>
      </main>
    );
  }

  const dashboardTitles = {
    narrator: "لوحة تحكم الراوي",
    admin: "لوحة تحكم المسؤول"
  };

  const handleLogout = () => {
    sessionStorage.removeItem("rawiDemoUser");
    navigate("/login");
  };

  return (
    <main className="utility-page" dir="rtl">
      <section className="utility-card">
        <h1>{dashboardTitles[role]}</h1>
        <h2>مرحباً، {session.name}</h2>

        <p>
          تم تسجيل الدخول بنجاح.
          سيتم إضافة لوحة التحكم الفعلية
          بعد دمج عمل الفريق.
        </p>

        <button
          className="button button-outline"
          onClick={handleLogout}
        >
          تسجيل الخروج
        </button>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate" element={<Activate />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Error Page */}
          <Route
            path="*"
            element={
              <main className="utility-page" dir="rtl">
                <section className="utility-card">
                  <h1>404 - الصفحة غير موجودة</h1>

                  <Link to="/" className="button button-dark">
                    العودة إلى الرئيسية
                  </Link>
                </section>
              </main>
            }
          />
        </Route>

        {/* Author Pages */}
        <Route element={<AuthorLayout />}>
          <Route
            path="/author/dashboard"
            element={<AuthorDashboard />}
          />

          <Route
            path="/dashboard"
            element={<Navigate to="/author/dashboard" replace />}
          />

          <Route path="/books" element={<MyBooks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<UploadBooks />} />
          <Route path="/auditions" element={<Auditions />} />
        </Route>

        {/* Narrator Pages */}
        <Route path="/narrator" element={<NarratorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<NarratorDashboard />} />
          <Route path="profile" element={<NarratorProfile />} />
          <Route path="samples" element={<VoiceSamples />} />
          <Route path="projects" element={<BrowseProjects />} />
          <Route
            path="projects/:projectId"
            element={<ProjectDetails />}
          />
          <Route path="auditions" element={<MyAuditions />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route
            path="my-projects/:projectId"
            element={<ProjectWork />}
          />
          <Route path="payments" element={<Payments />} />
        </Route>

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="book-approval" element={<AdminBooks />} />
          <Route
            path="book-visibility"
            element={<AdminBookVisibility />}
          />
          <Route path="auditions" element={<AdminAuditions />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="deliveries" element={<AdminDeliveries />} />
          <Route
            path="transactions"
            element={<AdminTransactions />}
          />
          <Route path="commission" element={<AdminCommission />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;