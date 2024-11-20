import { FC } from 'react';
import logo from '../../assets/svg/marvel_logo.svg';
import classes from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Characters' },
  { path: '/comics', label: 'Comics' },
  { path: '/favorites', label: 'Favorites' },
];

const Header: FC = () => {
  const location = useLocation();

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes.logo} />
      <nav className={classes.nav}>
        <ul>
          {navItems.map(({ path, label }) => (
            <li key={path} className={classes.navItem}>
              <Link to={path} className={location.pathname === path ? classes.active : ''}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
