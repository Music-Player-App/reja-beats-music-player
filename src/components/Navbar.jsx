import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { User } from 'lucide-react'; // profile icon

function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" data-aos="fade-down" data-aos-duration="800">
      <div className="navbar-logo">REJA</div>

      {/* Hamburger Icon (Mobile Only) */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </div>

      {/* Desktop Navigation */}
      <ul className="navbar-links desktop-nav">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/home">Music</NavLink></li>
        <li><NavLink to="/add-song">Add Song</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
      </ul>

      {/* Desktop Profile & Login/Logout */}
      <div className="navbar-login desktop-nav">
        {user && (
          <Link to="/profile" className="icon-btn" title="My Profile">
            <User size={20} />
          </Link>
        )}
        {user ? (
          <Link to="/logout" className="login-btn">Log out</Link>
        ) : (
          <Link to="/login" className="login-btn">Log in</Link>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="mobile-menu">
          <li className="mobile-close-btn">
            <button onClick={closeMenu}>✕</button>
          </li>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/home" onClick={closeMenu}>Music</NavLink></li>
          <li><NavLink to="/add-song" onClick={closeMenu}>Add Song</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About Us</NavLink></li>
          <li className="mobile-login">
            {user && (
              <Link to="/profile" className="icon-btn" onClick={closeMenu} title="My Profile">
                <User size={20} />
              </Link>
            )}
            {user ? (
              <Link to="/logout" className="login-btn" onClick={closeMenu}>Log out</Link>
            ) : (
              <Link to="/login" className="login-btn" onClick={closeMenu}>Log in</Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
