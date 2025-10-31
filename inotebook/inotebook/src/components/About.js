import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">About iNotebook</h1>
        <p className="text-muted fs-5">
          Your personal cloud notebook — safe, fast, and accessible anywhere 💻
        </p>
      </div>

      {/* Card Section */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card border-0 shadow-lg rounded-4 p-4">
            <div className="card-body">
              <h4 className="card-title text-primary fw-semibold mb-3">
                What is iNotebook?
              </h4>
              <p className="card-text text-secondary fs-6">
                <strong>iNotebook</strong> is a secure and easy-to-use digital
                notebook app built to keep your notes organized. Whether you’re
                jotting down ideas, managing tasks, or saving study materials,
                iNotebook ensures your data stays private and always available.
              </p>

              <hr />

              {/* Accordion Section */}
              <h5 className="fw-bold text-primary mt-4 mb-3">
                Key Features 🔑
              </h5>
              <div className="accordion" id="aboutAccordion">
                <div className="accordion-item border-0 mb-2 shadow-sm rounded-3">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      🔐 Secure Cloud Storage
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#aboutAccordion"
                  >
                    <div className="accordion-body text-secondary">
                      All your notes are encrypted and stored securely in the
                      cloud — accessible only by you.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-2 shadow-sm rounded-3">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      ⚡ Fast and Responsive
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#aboutAccordion"
                  >
                    <div className="accordion-body text-secondary">
                      Built using React and Node.js for lightning-fast
                      performance and smooth user experience on all devices.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-2 shadow-sm rounded-3">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      🧠 Smart Organization
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#aboutAccordion"
                  >
                    <div className="accordion-body text-secondary">
                      Tag and categorize your notes easily to find exactly what
                      you need in seconds.
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Developer Section */}
              <div className="text-center">
                <h5 className="text-primary fw-bold mb-2">
                  👨‍💻 Developed by Aaditya Prajapati
                </h5>
                <p className="text-muted small">
                  Passionate full-stack developer who loves building modern web
                  apps that make life easier.
                </p>
                <button
                  className="btn btn-outline-primary px-4 py-2 rounded-3"
                  onClick={() =>
                    window.open("https://github.com/abhishek12345516/", "_blank")
                  }
                >
                  Visit GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
