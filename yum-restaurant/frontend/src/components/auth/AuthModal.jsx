
import { useState } from "react";
import { X, LockKeyhole, Mail, User, Phone, Eye, EyeOff } from "lucide-react";
import { loginUser, registerCustomer } from "../../services/api";
import "./AuthModal.css";

function AuthModal({
  onClose,
  onAuthenticated,
  currentUser,
  onLogout,
}) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username_or_email: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const updateField = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;

      if (mode === "login") {
        response = await loginUser(
          form.username_or_email,
          form.password
        );
      } else {
        response = await registerCustomer({
          username: form.username,
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          password: form.password,
        });
      }

      onAuthenticated(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    return (
      <div className="auth-overlay" onClick={onClose}>
        <div
          className="auth-card account-card"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="auth-close" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="auth-logo">R</div>

          <h2>My Account</h2>
          <p className="auth-subtitle">
            You are currently signed in.
          </p>

          <div className="account-details">
            <strong>
              {currentUser.first_name} {currentUser.last_name}
            </strong>
            <span>{currentUser.email}</span>
            <span>Role: {currentUser.role}</span>
          </div>

          <button
            className="auth-submit logout-button"
            onClick={onLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-card"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="auth-close"
          onClick={onClose}
          aria-label="Close login"
        >
          <X size={20} />
        </button>

        <div className="auth-logo">R</div>

        <h2>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Sign in to your Restobit account."
            : "Join Restobit and start ordering."}
        </p>

        <div className="auth-tabs">
          <button
            className={mode === "login" ? "selected" : ""}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Login
          </button>

          <button
            className={mode === "register" ? "selected" : ""}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label>Username</label>
              <div className="auth-input">
                <User size={18} />
                <input
                  name="username"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={updateField}
                  required
                />
              </div>

              <label>First name</label>
              <div className="auth-input">
                <input
                  name="first_name"
                  placeholder="First name"
                  value={form.first_name}
                  onChange={updateField}
                  required
                />
              </div>

              <label>Last name</label>
              <div className="auth-input">
                <input
                  name="last_name"
                  placeholder="Last name"
                  value={form.last_name}
                  onChange={updateField}
                  required
                />
              </div>

              <label>Phone number</label>
              <div className="auth-input">
                <Phone size={18} />
                <input
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={updateField}
                  required
                />
              </div>

              <label>Email address</label>
              <div className="auth-input">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </div>
            </>
          )}

          {mode === "login" && (
            <>
              <label>Email or username</label>
              <div className="auth-input">
                <User size={18} />
                <input
                  name="username_or_email"
                  placeholder="Enter email or username"
                  value={form.username_or_email}
                  onChange={updateField}
                  required
                />
              </div>
            </>
          )}

          <label>Password</label>
          <div className="auth-input">
            <LockKeyhole size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={updateField}
              required
              minLength={mode === "register" ? 8 : undefined}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {error && (
            <div className="auth-error">{error}</div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Restaurant management, simplified.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
