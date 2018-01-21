import React from 'react'
import NavItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = ( props ) =>
  <div className={classes.NavigationItems}>
    
    <NavItem to='/'>Burger Builder</NavItem>
    {props.isAuth ? <NavItem to='/orders'>Orders</NavItem> : null}
    {props.isAuth
      ? <NavItem to='/logout'>Logout</NavItem>
      : <NavItem to='/auth'>Login</NavItem>
    }
  </div>

export default navigationItems