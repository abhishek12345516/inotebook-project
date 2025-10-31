import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import Footer from "./components/Footer";

function App() {
  const [alert, setAlert] = useState(null);

  // ✅ Global alert function
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const isLoggedIn = localStorage.getItem("token"); // ✅ Check token

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />

          <div className="container my-3">
            <Routes>
              {/* Protected Home Route */}
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Home showAlert={showAlert} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* About route (optional protected) */}
              <Route path="/about" element={<About />} />

              {/* Login Route */}
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    <Login showAlert={showAlert} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              {/* Signup Route */}
              <Route
                path="/signup"
                element={
                  !isLoggedIn ? (
                    <Signup showAlert={showAlert} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>

          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
