import React from 'react'
import Aux from '../../../hoc/Aux'

const orderSummary = ( props ) => {
  
  const ingredientsSummary = Object.keys( props.ingredients )
    .map( ingr => {
      return <li key={'summary' + ingr}>
          <span style={{textTransform: 'capitalize'}}>
            {ingr}: {props.ingredients[ingr]}
          </span>
      </li>
    } )
  
  return <Aux>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      {ingredientsSummary}
    </ul>
    <p>Continue to checkout?</p>
  </Aux>
}

export default orderSummary