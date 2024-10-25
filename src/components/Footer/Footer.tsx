import React, { FC } from 'react';
import logo from '../../assets/svg/marvel_logo.svg';
import classes from './Footer.module.scss';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <img src={logo} alt="Marvel Logo" className={classes.logo} />
        <p className={classes.text}>Data provided by Marvel. © {currentYear} MARVEL</p>
        <a
          href="https://developer.marvel.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          developer.marvel.com
        </a>

      </div>
    </footer>
  );
};

export default Footer;
