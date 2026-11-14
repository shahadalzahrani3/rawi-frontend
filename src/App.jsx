
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

// Shared Navbar
import Navbar from "./components/Navbar";

// Member 1 - Shahad
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Account Help Pages
import {
  Activate,
  ForgotPassword
} from "./pages/AccountHelp";

// Shared CSS
import "./App.css";

// Temporary Dashboard Component
// Will be replaced when team members finish their pages
function DashboardPreview() {
  const { role } = useParams();
  const navigate = useNavigate();

  const session = JSON.parse(
    sessionStorage.getItem("rawiDemoUser") || "null"
  );

  // Check if user is logged in
  if (!session || session.role !== role) {
    return (
      <main className="utility-page" dir="rtl">

        <section className="utility-card">

          <h1>يرجى تسجيل الدخول أولاً</h1>

          <p>
            يجب تسجيل الدخول للوصول إلى لوحة التحكم.
          </p>

          <Link to="/login" className="button button-dark">
            تسجيل الدخول
          </Link>

        </section>

      </main>
    );
  }

  // Dashboard titles
  const dashboardTitles = {
    author: "لوحة تحكم المؤلف",
    narrator: "لوحة تحكم الراوي",
    admin: "لوحة تحكم المسؤول"
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("rawiDemoUser");
    navigate("/login");
  };

  return (
    <main className="utility-page" dir="rtl">

      <section className="utility-card">

        <span className="eyebrow">
          لوحة التحكم
        </span>

        <h1>
          {dashboardTitles[role]}
        </h1>

        <h2>
          مرحباً، {session.name}
        </h2>

        <p>
          تم تسجيل الدخول إلى حسابك التجريبي بنجاح.
        </p>

        <p>
          هذه لوحة تحكم مؤقتة.
          سيتم استبدالها بالصفحة الفعلية
          بعد دمج عمل أعضاء الفريق.
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

      {/* Shared Navbar */}
      <Navbar />

      <Routes>

        {/* Homepage */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Registration */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Account Activation */}
        <Route
          path="/activate"
          element={<Activate />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Member 2 - Author Dashboard */}
        <Route
          path="/author/dashboard"
          element={<DashboardPreview />}
        />

        {/* Member 3 - Narrator Dashboard */}
        <Route
          path="/narrator/dashboard"
          element={<DashboardPreview />}
        />

        {/* Member 4 - Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<DashboardPreview />}
        />

        {/* 404 - Page Not Found */}
        <Route
          path="*"
          element={
            <main className="utility-page" dir="rtl">
              <section className="utility-card">

                <h1>404 - الصفحة غير موجودة</h1>

                <p>
                  عذراً، الصفحة التي تبحث عنها غير موجودة.
                </p>

                <Link
                  to="/"
                  className="button button-dark"
                >
                  العودة إلى الرئيسية
                </Link>

              </section>
            </main>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
