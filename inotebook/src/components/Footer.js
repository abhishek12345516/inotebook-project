import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="text-light pt-5 pb-4 mt-5"
      style={{
        background: "linear-gradient(180deg, #0a0b0d, #111418)",
        borderTop: "2px solid #0d6efd",
      }}
    >
      <div className="container">
        <div className="row gy-4 justify-content-between">
          {/* Logo + Description */}
          <div className="col-md-4 text-center text-md-start">
            <h3 className="fw-bold text-primary mb-3">iNotebook</h3>
            <p className="text-secondary small lh-lg">
              Your personal cloud notebook — safe, smart, and accessible
              anywhere. Keep your thoughts organized and ideas flowing. 💡
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 text-center text-md-start">
            <h6 className="text-uppercase text-primary fw-semibold mb-3">
              Quick Links
            </h6>
            <ul className="list-unstyled">
              {["Home", "About", "Login", "Signup"].map((link) => (
                <li key={link} className="mb-2">
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-light text-decoration-none link-hover"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials + Back to Top */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="text-uppercase text-primary fw-semibold mb-3">
              Connect With Us
            </h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="btn btn-primary btn-sm rounded-pill px-4 shadow-sm"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary small">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary fw-semibold">iNotebook</span>. All
          Rights Reserved.
          <br />
          Made with by{" "}
          <strong className="text-light">Aaditya Prajapati</strong>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .social-icon {
            color: #f8f9fa;
            font-size: 1.4rem;
            transition: all 0.3s ease-in-out;
          }

          .social-icon:hover {
            color: #0d6efd;
            transform: scale(1.2) rotate(8deg);
          }

          .link-hover {
            transition: color 0.3s ease-in-out;
          }

          .link-hover:hover {
            color: #0d6efd !important;
          }

          footer {
            box-shadow: 0 -2px 15px rgba(0,0,0,0.3);
          }

          @media (max-width: 768px) {
            footer h3 {
              font-size: 1.5rem;
            }
            footer .social-icon {
              font-size: 1.3rem;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
