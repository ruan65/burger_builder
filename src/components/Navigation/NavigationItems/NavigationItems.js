import React from 'react'
import { NavLink } from 'react-router-dom'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = () =>
  <div className={classes.NavigationItems}>
    
    <NavLink to='/'>Burger Builder</NavLink>
    <NavLink to='/checkout'>Checkout</NavLink>
    <NavLink to='/'>Dummy</NavLink>
  
  </div>


export default navigationItems