import React from 'react'
import classes from './NavigationItem.css'

const navigationItem = (props) =>
  <ul className={classes.NavigationItem}>
    <li><a href='/'>A link</a></li>
  </ul>

export default navigationItem