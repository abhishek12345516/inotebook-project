import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignup, showAlert }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    const { name, email, password, cpassword } = credentials;
    if (!name || !email || !password || !cpassword)
      return "Please fill all fields.";

    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRe.test(email)) return "Enter a valid email address.";
    if (name.length < 2) return "Name should be at least 2 characters.";
    if (password.length < 6) return "Password should be at least 6 characters.";
    if (password !== cpassword) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        showAlert("Signup successful!", "success");
        navigate("/login");
      } else {
        showAlert(json.error || "Invalid details. Please try again.", "danger");
      }

      if (onSignup) await onSignup(credentials);
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "80vh",
        background: "linear-gradient(180deg,#f8fafc,#eef2f7)",
      }}
    >
      <div className="card shadow rounded-4 border-0" style={{ maxWidth: 520 }}>
        <div className="card-body p-4 p-md-5">
          <h3 className="card-title text-center mb-3 fw-bold">
            Create account
          </h3>
          <p className="text-center text-muted mb-4">
            Sign up to start saving notes securely
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control form-control-lg rounded-3"
                placeholder="Your name"
                value={credentials.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control form-control-lg rounded-3"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg rounded-3"
                  placeholder="Create a password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label fw-semibold">
                Confirm password
              </label>
              <input
                id="cpassword"
                type="password"
                name="cpassword"
                className="form-control form-control-lg rounded-3"
                placeholder="Repeat password"
                value={credentials.cpassword}
                onChange={handleChange}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success btn-lg rounded-4 fw-semibold"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg,#20c997,#198754)",
                  border: "none",
                }}
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
