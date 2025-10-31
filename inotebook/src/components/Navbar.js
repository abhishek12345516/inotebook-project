import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ showAlert }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logged out successfully!", "success");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 sticky-top">
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-4 text-light d-flex align-items-center"
          to="/"
        >
          <i className="bi bi-journal-text me-2 text-warning"></i> iNotebook
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/"
                    ? "active text-warning fw-semibold"
                    : "text-light"
                }`}
                to="/"
              >
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/about"
                    ? "active text-warning fw-semibold"
                    : "text-light"
                }`}
                to="/about"
              >
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>
          </ul>

          {/* ✅ Buttons based on login status */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  to="/login"
                  className="btn px-4 py-2 fw-semibold text-white shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #007bff, #6610f2)",
                    border: "none",
                    borderRadius: "12px",
                    transition: "0.3s",
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>

                <Link
                  to="/signup"
                  className="btn px-4 py-2 fw-semibold text-white shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #20c997, #0d6efd)",
                    border: "none",
                    borderRadius: "12px",
                    transition: "0.3s",
                  }}
                >
                  <i className="bi bi-person-plus me-1"></i> Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-danger px-4 py-2 fw-semibold rounded-3 shadow-sm"
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
