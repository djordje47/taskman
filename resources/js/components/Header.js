import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
  return (
      <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className="container">
          <Link to='/' className="navbar-brand">TaskMan</Link>
        </div>
      </nav>
  );
};

export default Header;