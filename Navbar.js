import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/signup" activeClassName="active">
        Signup
      </NavLink>
      <NavLink to="/login" activeClassName="active">
        Login
      </NavLink>
      <NavLink to="/adminlogin" activeClassName="active" >
        Admin
      </NavLink>
    </div>
  );
}

export default Navbar;
