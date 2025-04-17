import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const collapseRef = useRef(null);

  const handleNavClick = () => {
    // For tab and mobile sizes
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (collapseRef.current?.classList.contains('show')) {
          collapseRef.current.classList.remove('show');
        }
      }, 1200);
    }
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/" onClick={handleNavClick}>MediaMinds</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleNavClick}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business" onClick={handleNavClick}>Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment" onClick={handleNavClick}>Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general" onClick={handleNavClick}>General</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health" onClick={handleNavClick}>Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science" onClick={handleNavClick}>Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports" onClick={handleNavClick}>Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology" onClick={handleNavClick}>Technology</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
