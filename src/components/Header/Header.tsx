import React, { FC } from 'react'
import logo from '../../assets/svg/marvel_logo.svg'
import classes from './Header.module.scss'
const Header: FC = () => {
  return (
    <header className={classes.header}>
        <img src={logo} alt='logo' className={classes.logo}/>
        <nav className={classes.nav}>
            <ul>
                <li className={classes.navItem}>Characters</li>
                <li className={classes.navItem}>Comics</li>
            </ul>
        </nav>
    </header>
  )
}

export default Header