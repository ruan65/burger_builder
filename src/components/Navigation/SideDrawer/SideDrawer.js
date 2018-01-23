import React from 'react'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {

  const attachedClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close
  ]

  return <Aux>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')} onClick={props.closed}>
      <div className={classes.Logo}>
        <Logo height='11%'/>
      </div>
      <nav>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </div>
  </Aux>
}

export default sideDrawer