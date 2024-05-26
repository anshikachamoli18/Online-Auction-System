import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
  const { isAuthenticated } = useAuth();

  const navBarStyle = {
    width: "100%",
    color: "white",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    backgroundColor: "#077086",
  };

  const navBrandStyle = {
    color: "#d58717",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    fontSize: "2rem",  // Increased font size for the brand
    marginLeft: "1rem",
  };

  const navLinkStyle = {
    color: "white",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    fontSize: "30px",  // Increased font size for links
    marginLeft: "1rem",
    transition: "color 0.3s ease",  // Add transition for hover effect
  };

  const navLinkHoverStyle = {
    color: "#d58717",
  };

  const highlightLinkStyle = {
    color: "#d58717",
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={navBarStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={navBrandStyle}>
          Bidding
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/works"
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
              >
                How it works
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
              >
                Contact us
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{ ...navLinkStyle, ...highlightLinkStyle }}
                    onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                    onMouseOut={(e) => e.target.style.color = highlightLinkStyle.color}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ ...navLinkStyle, ...highlightLinkStyle }}
                    onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                    onMouseOut={(e) => e.target.style.color = highlightLinkStyle.color}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/profile"
                  style={{ ...navLinkStyle, ...highlightLinkStyle }}
                  onMouseOver={(e) => e.target.style.color = navLinkHoverStyle.color}
                  onMouseOut={(e) => e.target.style.color = highlightLinkStyle.color}
                >
                  My Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
