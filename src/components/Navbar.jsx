import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = (props) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.setSearchQuery(query);

    setQuery('');
  }

  const [category, setCategory] = useState('general');
  const collapseRef = useRef(null);

  const handleNavClick = (value) => {
    // For tab and mobile sizes
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (collapseRef.current?.classList.contains('show')) {
          collapseRef.current.classList.remove('show');
        }
      }, 1200);
    }

    setCategory(value);
    props.setSearchQuery('');
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/" onClick={() => {handleNavClick("general")}}>MediaMinds</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => {handleNavClick("general")}}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business" onClick={() => {handleNavClick("business")}}>Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment" onClick={() => {handleNavClick("entertainment")}}>Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general" onClick={() => {handleNavClick("general")}}>General</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health" onClick={() => {handleNavClick("health")}}>Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science" onClick={() => {handleNavClick("science")}}>Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports" onClick={() => {handleNavClick("sports")}}>Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology" onClick={() => {handleNavClick("technology")}}>Technology</Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input autoFocus className="form-control me-2 search-md-width" value={query} onChange={handleSearchChange} type="search" placeholder={`Search under ${category}...`} aria-label="Search" />
              <button className="btn btn-outline-success" type="submit"><img style={{width: "28px", filter: "invert(100%)"}} src="/search.png" alt="Search" /></button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
