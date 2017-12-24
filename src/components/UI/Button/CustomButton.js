import React from 'react'
import classes from './CustomButton.css'

const customButton = ( props ) =>
  <button className={[classes.CustomButton, classes[props.btnType]].join(' ')}
          onClick={props.clicked}>
    {props.children}
  </button>

export default customButton