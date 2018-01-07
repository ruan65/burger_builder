import React from 'react'
import classes from './Input.css'

function getInputElement( props ) {
  
  const inputStyleClasses = [classes.InputElement]
  
  if (props.shouldValidate && props.touched && props.invalid) {
    inputStyleClasses.push(classes.Invalid)
  }
  
  const style = inputStyleClasses.join(' ')
  
  let inputElement = null
  
  const inputType = <input className={style}
                           {...props.elementConfig}
                           onChange={props.changed}
                           value={props.value}/>
  
  const textareaType = <textarea className={style}
                                 {...props.elementConfig}
                                 onChange={props.changed}
                                 value={props.value}/>
  
  switch ( props.elementType ) {
    case ( 'input' ):
      inputElement = inputType
      break
    case ( 'select' ):
      inputElement = (
        <select className={style}
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
  return inputElement
}

const input = ( props ) => {
  
  return <div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {getInputElement(props)}
  </div>
}

export default input