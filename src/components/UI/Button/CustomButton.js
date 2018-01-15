import React from 'react'
import classes from './CustomButton.css'

export const ButtonType = {
  Success: 'Success',
  Danger: 'Danger'
}

const customButton = ( props ) =>
  <button className={[classes.CustomButton, classes[props.btnType]].join( ' ' )}
          onClick={props.clicked}
          disabled={props.disabled}>
    {props.children}
  </button>

export default customButton