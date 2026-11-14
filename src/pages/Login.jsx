
import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  digestPassword,
  readAccounts,
  writeAccounts
} from "../utils/demoAccounts";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    localStorage.getItem("rawiRememberEmail") || ""
  );

  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setPending(true);

    try {
      const accounts = readAccounts();

      const index = accounts.findIndex(
        (account) =>
          account.email === email.trim().toLowerCase()
      );

      if (index === -1) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }

      const account = accounts[index];

      if (account.status === "suspended") {
        setError("هذا الحساب موقوف. يرجى التواصل مع الدعم.");
        return;
      }

      if (account.status === "deactivated") {
        setError("هذا الحساب معطّل. يرجى التواصل مع الدعم.");
        return;
      }

      if (!account.active) {
        setError("الحساب لم يُفعّل بعد. يرجى تفعيل الحساب.");
        return;
      }

      if (
        account.lockedUntil &&
        Date.now() < account.lockedUntil
      ) {
        setError("تم إيقاف المحاولات مؤقتاً. حاول بعد قليل.");
        return;
      }

      const hash = await digestPassword(
        password,
        account.salt
      );

      if (hash !== account.hash) {
        account.failedAttempts =
          (account.failedAttempts || 0) + 1;

        if (account.failedAttempts >= 5) {
          account.lockedUntil = Date.now() + 60000;
          account.failedAttempts = 0;
        }

        writeAccounts(accounts);

        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }

      account.failedAttempts = 0;
      account.lockedUntil = 0;

      writeAccounts(accounts);

      const session = {
        name: account.name,
        email: account.email,
        role: account.role
      };

      sessionStorage.setItem(
        "rawiDemoUser",
        JSON.stringify(session)
      );

      if (remember) {
        localStorage.setItem(
          "rawiRememberEmail",
          account.email
        );
      } else {
        localStorage.removeItem("rawiRememberEmail");
      }

      navigate(`/${account.role}/dashboard`);

    } catch {
      setError("تعذر تسجيل الدخول حالياً.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="auth-layout" dir="rtl">

      {/* Right Side - Welcome */}
      <aside className="auth-side">

        <div className="auth-side-brand">
          راوي
        </div>

        <div>
          <h2>مرحباً بعودتك</h2>

          <p>
            أكمل مشروعك، تابع تجارب الأداء،
            أو اكتشف فرصتك التالية.
          </p>
        </div>

      </aside>

      {/* Left Side - Login Form */}
      <section className="auth-content">

        <div className="auth-form-wrap">

          <span className="eyebrow">
            تسجيل الدخول
          </span>

          <h1>أهلاً بك في راوي</h1>

          <p className="form-intro">
            سجّل الدخول للمتابعة
          </p>

          {location.state?.message && (
            <p className="form-success" role="status">
              {location.state.message}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <label htmlFor="login-email">
              البريد الإلكتروني
            </label>

            <input
              id="login-email"
              type="email"
              dir="ltr"
              placeholder="sara@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            {/* Password */}
            <label htmlFor="login-password">
              كلمة المرور
            </label>

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            {/* Show Password */}
            <label className="check-label">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                  setShowPassword(e.target.checked)
                }
              />

              إظهار كلمة المرور
            </label>

            {/* Remember Me */}
            <div className="auth-options">

              <label className="check-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                تذكرني
              </label>

              <Link to="/forgot-password">
                نسيت كلمة المرور؟
              </Link>

            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="button button-dark button-full"
              disabled={pending}
            >
              {pending
                ? "جارٍ التحقق..."
                : "تسجيل الدخول"}
            </button>

          </form>

          {/* Narrator Registration */}
          <Link
            to="/register?role=narrator"
            className="button button-outline button-full secondary-auth"
          >
            انضم كراوٍ
          </Link>

          {/* Activation Link */}
          <Link to="/activate" className="form-link">
            تفعيل الحساب
          </Link>

          {/* Register Link */}
          <p className="form-bottom">
            ليس لديك حساب؟{" "}
            <Link to="/register">
              إنشاء حساب
            </Link>
          </p>

          <p className="demo-disclaimer">
            هذه محاكاة للواجهة؛ البيانات محفوظة
            في هذا المتصفح فقط.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;
