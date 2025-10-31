// ✅ Login.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // ✅ renamed properly

    let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Successfully logged in","success");
      navigate("/");
    }else{
      props.showAlert("Invalid details","danger");
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
          <h3 className="card-title text-center mb-3 fw-bold">Welcome back</h3>
          <p className="text-center text-muted mb-4">
            Login to your iNotebook account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="loginEmail"
                className="form-label fw-semibold"
              >
                Email
              </label>
              <input
                id="loginEmail"
                name="email"
                type="email"
                className="form-control form-control-lg rounded-3"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                htmlFor="loginPassword"
                className="form-label fw-semibold"
              >
                Password
              </label>
              <div className="input-group">
                <input
                  id="loginPassword"
                  name="password"
                  type={showPassword ? "text" : "password"} // ✅ fixed variable name
                  className="form-control form-control-lg rounded-3"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} // ✅ fixed
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-4 fw-semibold"
                style={{
                  background: "linear-gradient(135deg,#007bff,#6610f2)",
                  border: "none",
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
