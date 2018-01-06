import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItems.css'

const navigationItems = () =>
  <div className={classes.NavigationItems}>
    
    <NavLink to='/'>Burger Builder</NavLink>
    <NavLink to='/checkout'>Checkout</NavLink>
    <NavLink to='/orders'>Orders</NavLink>
  
  </div>


export default navigationItems