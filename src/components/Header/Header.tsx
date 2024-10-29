import React, { FC } from 'react';
import logo from '../../assets/svg/marvel_logo.svg';
import classes from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';

const Header: FC = () => {
  const location = useLocation(); 

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes.logo} />
      <nav className={classes.nav}>
        <ul>
          <li className={classes.navItem}>
            <Link to='/' className={location.pathname === '/' ? classes.active : ''}>
              Characters
            </Link>
          </li>
          <li className={classes.navItem}>
            <Link to='/comics' className={location.pathname === '/comics' ? classes.active : ''}>
              Comics
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;