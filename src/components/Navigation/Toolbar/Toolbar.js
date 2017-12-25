import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolBar = ( props ) =>
  <header className={classes.Toolbar}>
    
    <div>MENU</div>
    <div className={classes.Logo}>
      <Logo height='80%'/>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems/>
    </nav>
  
  </header>

export default toolBar