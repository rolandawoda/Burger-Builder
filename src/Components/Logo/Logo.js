import React from 'react';
import BurgerLogo from '../../Assets/Images/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={BurgerLogo} alt="My Burger" />
  </div>
);

export default Logo;