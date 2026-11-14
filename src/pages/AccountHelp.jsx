
import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams
} from "react-router-dom";

import {
  digestPassword,
  readAccounts,
  writeAccounts
} from "../utils/demoAccounts";

// Account Activation Page
export function Activate() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [email, setEmail] = useState(
    params.get("email") || ""
  );

  const [message, setMessage] = useState("");

  const handleActivate = (e) => {
    e.preventDefault();

    const accounts = readAccounts();

    const account = accounts.find(
      (item) =>
        item.email === email.trim().toLowerCase()
    );

    if (!account) {
      setMessage("لم يتم العثور على هذا الحساب.");
      return;
    }

    // Simulate account activation
    account.active = true;

    writeAccounts(accounts);

    navigate("/login", {
      state: {
        message:
          "تم تفعيل حسابك التجريبي بنجاح. يمكنك تسجيل الدخول الآن."
      }
    });
  };

  return (
    <main className="utility-page" dir="rtl">

      <section className="utility-card">

        <span className="eyebrow">
          تفعيل الحساب
        </span>

        <h1>فعّل حسابك</h1>

        <p>
          في النسخة الفعلية سيصلك رابط تفعيل
          على بريدك الإلكتروني.
          هنا يمكنك محاكاة الضغط على الرابط.
        </p>

        <form onSubmit={handleActivate}>

          <label htmlFor="activation-email">
            البريد الإلكتروني
          </label>

          <input
            id="activation-email"
            type="email"
            dir="ltr"
            placeholder="sara@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="button button-dark button-full"
          >
            تفعيل تجريبي
          </button>

        </form>

        {message && (
          <p className="form-error" role="alert">
            {message}
          </p>
        )}

        <Link to="/login">
          العودة إلى تسجيل الدخول
        </Link>

      </section>

    </main>
  );
}

// Forgot Password Page
export function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState("email");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const accounts = readAccounts();

    const account = accounts.find(
      (item) =>
        item.email === email.trim().toLowerCase()
    );

    // Step 1: Verify demo email exists
    if (stage === "email") {
      if (!account) {
        setError("لم يتم العثور على هذا البريد الإلكتروني.");
        return;
      }

      setError("");
      setStage("password");
      return;
    }

    // Step 2: Validate new password
    if (
      password.length < 8 ||
      !/[A-Za-z\u0621-\u064A]/.test(password) ||
      !/\d/.test(password)
    ) {
      setError(
        "اكتب 8 أحرف على الأقل تحتوي على حرف ورقم."
      );
      return;
    }

    if (!account) {
      setError("لم يتم العثور على الحساب.");
      return;
    }

    // Simulate resetting password
    const salt = crypto.randomUUID();

    account.salt = salt;
    account.hash = await digestPassword(
      password,
      salt
    );

    account.failedAttempts = 0;
    account.lockedUntil = 0;

    writeAccounts(accounts);

    navigate("/login", {
      state: {
        message:
          "تم تغيير كلمة المرور التجريبية بنجاح."
      }
    });
  };

  return (
    <main className="utility-page" dir="rtl">

      <section className="utility-card">

        <span className="eyebrow">
          استعادة الحساب
        </span>

        <h1>نسيت كلمة المرور؟</h1>

        <p>
          هذه محاكاة لإعادة تعيين كلمة المرور.
          في التطبيق الحقيقي يجب تأكيد الهوية
          من خلال رسالة بريد إلكتروني.
        </p>

        <form onSubmit={handleReset}>

          <label htmlFor="reset-email">
            البريد الإلكتروني
          </label>

          <input
            id="reset-email"
            type="email"
            dir="ltr"
            placeholder="sara@example.com"
            value={email}
            disabled={stage === "password"}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />

          {stage === "password" && (
            <>
              <label htmlFor="reset-password">
                كلمة المرور الجديدة
              </label>

              <input
                id="reset-password"
                type="password"
                placeholder="أدخل كلمة المرور الجديدة"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />
            </>
          )}

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button button-dark button-full"
          >
            {stage === "email"
              ? "متابعة"
              : "حفظ كلمة المرور"}
          </button>

        </form>

        <Link to="/login">
          العودة إلى تسجيل الدخول
        </Link>

      </section>

    </main>
  );
}
