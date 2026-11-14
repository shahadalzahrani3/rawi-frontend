
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  digestPassword,
  readAccounts,
  writeAccounts
} from "../utils/demoAccounts";

function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: params.get("role") === "narrator"
      ? "narrator"
      : "author"
  });

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setError("");
  };

  // Validate and submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (Object.values(form).some((value) => !value.trim())) {
      setError("يرجى تعبئة جميع الحقول.");
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }

    // Validate phone number
    if (!/^\+?[\d\s-]{9,15}$/.test(form.phone.trim())) {
      setError("يرجى إدخال رقم هاتف صحيح.");
      return;
    }

    // Validate password
    if (
      form.password.length < 8 ||
      !/[A-Za-z\u0621-\u064A]/.test(form.password) ||
      !/\d/.test(form.password)
    ) {
      setError(
        "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وحرف ورقم."
      );
      return;
    }

    // Confirm passwords match
    if (form.password !== form.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    const email = form.email.trim().toLowerCase();

    // Check if email already exists
    if (readAccounts().some((account) => account.email === email)) {
      setError("هذا البريد الإلكتروني مسجل مسبقاً.");
      return;
    }

    setPending(true);

    try {
      // Demo password verification only
      const salt = crypto.randomUUID();
      const hash = await digestPassword(form.password, salt);

      const newAccount = {
        name: form.name.trim(),
        email: email,
        phone: form.phone.trim(),
        role: form.role,
        salt: salt,
        hash: hash,
        active: false,
        status: "normal",
        failedAttempts: 0
      };

      // Save demo account
      writeAccounts([
        ...readAccounts(),
        newAccount
      ]);

      // Navigate to demo activation page
      navigate(`/activate?email=${encodeURIComponent(email)}`);

    } catch {
      setError("تعذر إنشاء الحساب التجريبي. حاول مرة أخرى.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="auth-layout" dir="rtl">

      {/* Right Side - Welcome Panel */}
      <aside className="auth-side">

        <div className="auth-side-brand">
          راوي
        </div>

        <div>
          <h2>لكل قصة صوت</h2>

          <p>
            أنشئ حسابك وابدأ رحلتك في صناعة
            الكتب الصوتية العربية.
          </p>
        </div>

      </aside>

      {/* Left Side - Registration Form */}
      <section className="auth-content">

        <div className="auth-form-wrap">

          <span className="eyebrow">
            إنشاء حساب
          </span>

          <h1>انضم إلى راوي</h1>

          <p className="form-intro">
            ابدأ رحلتك معنا
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <label htmlFor="name">
              الاسم الكامل
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="أدخل اسمك الكامل"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
            />

            {/* Email */}
            <label htmlFor="email">
              البريد الإلكتروني
            </label>

            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              placeholder="sara@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />

            {/* Phone Number */}
            <label htmlFor="phone">
              رقم الهاتف
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              placeholder="05xxxxxxxx"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Role Selection */}
            <label htmlFor="role">
              نوع الحساب
            </label>

            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="author">
                مؤلف
              </option>

              <option value="narrator">
                راوٍ
              </option>
            </select>

            {/* Password */}
            <label htmlFor="password">
              كلمة المرور
            </label>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="8 أحرف مع حرف ورقم"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
            />

            {/* Confirm Password */}
            <label htmlFor="confirmPassword">
              تأكيد كلمة المرور
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="أعد إدخال كلمة المرور"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
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

            {/* Error Message */}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="button button-dark button-full"
              disabled={pending}
            >
              {pending
                ? "جارٍ إنشاء الحساب..."
                : "إنشاء حساب"}
            </button>

          </form>

          {/* Login Link */}
          <p className="form-bottom">
            لديك حساب بالفعل؟{" "}
            <Link to="/login">
              تسجيل الدخول
            </Link>
          </p>

          <p className="demo-disclaimer">
            نموذج تفاعلي للتجربة فقط؛
            تفعيل البريد الحقيقي يحتاج إلى خادم خلفي.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;
