import React from 'react'
import classes from './Order.css'

const order = ( props ) => {
  
  const ingrObj = props.order.ingredients
  
  const ingredients = ingrObj ?
    
    Object.entries( ingrObj ).map( ( ingr, i ) =>
      <p key={ingr[0] + i}>{ingr[0]}: ({ingr[1]})</p> )
    
    : null
  
  return (
    <div className={classes.Order}>
      {ingredients}
      <p>Price: <strong>$ {props.order.totalPrice}</strong></p>
    </div>
  )
}

export default order