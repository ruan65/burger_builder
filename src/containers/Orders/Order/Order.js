import React from 'react'
import classes from './Order.css'

const order = ( props ) => {
  
  const ingrObj = props.order.ingredients
  
  const ingredients = ingrObj ?
    
    Object.entries( ingrObj ).map( ( ingr, i ) =>
      <span className={classes.Ingredient}
            key={ingr[0] + i}>
        {ingr[0]}: ({ingr[1]})
      </span> )
    
    : null
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>$ {props.order.totalPrice.toFixed(2)}</strong></p>
    </div>
  )
}

export default order