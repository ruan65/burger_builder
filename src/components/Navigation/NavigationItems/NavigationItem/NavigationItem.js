import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.css'

const navigationItem = ( props ) =>
  <ul className={classes.NavigationItem}>
    <li><NavLink
      activeClassName={classes.active}
      to={props.to}
      exact
    >{props.children}</NavLink></li>
  </ul>

export default navigationItem