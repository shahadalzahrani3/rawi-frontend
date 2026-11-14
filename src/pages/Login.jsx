
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem("rawiDemoAccounts") || "[]"
    );

    const user = accounts.find(
      (account) =>
        account.email === email.trim().toLowerCase()
    );

    if (!user) {
      setError("Account not found. Please register first.");
      return;
    }

    // Front-end simulation only.
    // The password is not verified without a backend.
    if (password.length < 8) {
      setError("Enter at least 8 characters for this demo.");
      return;
    }

    sessionStorage.setItem(
      "rawiDemoUser",
      JSON.stringify(user)
    );

    navigate(`/${user.role}/dashboard`);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back!</h1>
        <p>Login to continue your Rawi journey.</p>

        {location.state?.message && (
          <p className="form-success" role="status">
            {location.state.message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) =>
                setShowPassword(e.target.checked)
              }
            />
            Show password
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        <p className="demo-notice">
          Demo mode: passwords are not verified.
          Use test details only.
        </p>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
