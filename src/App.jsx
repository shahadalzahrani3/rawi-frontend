
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

// Author Pages - Teammate
import Sidebar from "./pagesStructure/components/Sidebar";
import Auditions from "./pagesStructure/pages/Auditions";
import AuthorDashboard from "./pagesStructure/pages/AuthorDashboard";
import MyBooks from "./pagesStructure/pages/MyBooks";
import UploadBooks from "./pagesStructure/pages/UploadBooks";
// Narrator Pages - Norah
import NarratorLayout from "./pagesStructure/components/NarratorLayout";
import NarratorDashboard from "./pagesStructure/pages/narrator/NarratorDashboard";
import NarratorProfile from "./pagesStructure/pages/narrator/NarratorProfile";
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

// Temporary Narrator and Admin Dashboard
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

// Main Application
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages - Shahad */}
        <Route element={<PublicLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/activate" element={<Activate />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Admin Dashboard - Temporary */}
          <Route
            path="/admin/dashboard"
            element={<DashboardPreview />}
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

        {/* Author Pages - Teammate */}
        <Route element={<AuthorLayout />}>

          <Route
            path="/author/dashboard"
            element={<AuthorDashboard />}
          />

          <Route
            path="/dashboard"
            element={<Navigate to="/author/dashboard" replace />}
          />

          <Route
            path="/books"
            element={<MyBooks />}
          />

          <Route
            path="/upload"
            element={<UploadBooks />}
          />

          <Route
            path="/auditions"
            element={<Auditions />}
          />

        </Route>
        {/* Narrator Pages - Norah */}
        <Route path="/narrator" element={<NarratorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<NarratorDashboard />} />
          <Route path="profile" element={<NarratorProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
