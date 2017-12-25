import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = () =>
  <div className={classes.NavigationItems}>
    
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/' >Checkout</NavigationItem>
    <NavigationItem link='/' >Dummy</NavigationItem>
  
  </div>


export default navigationItems