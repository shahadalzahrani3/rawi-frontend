import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "author"
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() ||
        !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem("rawiDemoAccounts") || "[]"
    );

    if (accounts.some(
      (user) => user.email === form.email.trim().toLowerCase()
    )) {
      setError("This email is already registered.");
      return;
    }

   
    const account = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role
    };

    localStorage.setItem(
      "rawiDemoAccounts",
      JSON.stringify([...accounts, account])
    );

    navigate("/login", {
      state: { message: "Registration successful! Please log in." }
    });
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create an Account</h1>
        <p>Join Rawi and bring stories to life.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) =>
                setShowPassword(e.target.checked)
              }
            />
            Show passwords
          </label>

          <label htmlFor="role">I am joining as</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="author">Author</option>
            <option value="narrator">Narrator</option>
            <option value="listener">Listener</option>
          </select>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;

