import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">MyApp</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span>Welcome, {user}</span>
            <button onClick={logout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
