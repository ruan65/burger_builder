import React from 'react'
import classes from './Input.css'

const input = ( props ) => {
  
  let inputElement = null
  
  const inputType = <input className={classes.InputElement}
                           {...props.elementConfig}
                           onChange={props.changed}
                           value={props.value}/>
  
  const textareaType = <textarea className={classes.InputElement}
                                 {...props.elementConfig}
                                 onChange={props.changed}
                                 value={props.value}/>
  
  switch ( props.elementType ) {
    case ( 'input' ):
      inputElement = inputType
      break
    case ( 'select' ):
      inputElement = (
        <select className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>
          {props.elementConfig.options.map( cnf => (
            <option key={cnf.value} value={cnf.value}>{cnf.displayValue}</option>
          ) )}
        </select>
      )
      break
    case ( 'textarea' ):
      inputElement = textareaType
      break
    default:
      inputElement = inputType
  }
  
  return <div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {inputElement}
  </div>
}

export default input