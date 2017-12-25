import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolBar = ( props ) =>
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.showSideDrawer}/>
    <div className={classes.Logo}>
      <Logo height='80%'/>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems/>
    </nav>
  
  </header>

export default toolBar