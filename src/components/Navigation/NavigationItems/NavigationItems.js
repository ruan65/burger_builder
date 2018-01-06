import React from 'react'
import NavItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = () =>
  <div className={classes.NavigationItems}>
    
    <NavItem to='/'>Burger Builder</NavItem>
    <NavItem to='/orders'>Orders</NavItem>
  
  </div>


export default navigationItems