import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = ( props ) =>
  <div className={classes.NavigationItems}>
    
    <NavigationItem to='/'>Burger Builder</NavigationItem>
    {props.isAuth ? <NavigationItem to='/orders'>Orders</NavigationItem> : null}
    {props.isAuth
      ? <NavigationItem to='/logout'>Logout</NavigationItem>
      : <NavigationItem to='/auth'>Login</NavigationItem>
    }
  </div>

export default navigationItems