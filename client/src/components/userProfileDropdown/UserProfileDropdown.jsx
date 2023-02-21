import React, { useState } from 'react';
import './userProfileDropdown.css';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Logout from "../logout/Logout";

const UserProfileDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="user-profile-dropdown">
      <button onClick={toggleMenu} className="user-profile-dropdown__button">
        {user ? (
          <div>
            {user.username}
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">Register</button>
            <button onClick={() => navigate("/login")} className="navButton">Sign in</button>
          </div>
        )}
        <i className="fas fa-chevron-down"></i>
      </button>
      {user && showMenu && (
  <div className="user-profile-dropdown__menu">
    <Link to={`/users/${user._id}`} className="user-profile-dropdown__link">Profile</Link>
    {/* <Link to="/settings" className="user-profile-dropdown__link">Settings</Link> */}
    <Logout onLogout={logout} />
  </div>
)}

    </div>
  );
};

export default UserProfileDropdown;
