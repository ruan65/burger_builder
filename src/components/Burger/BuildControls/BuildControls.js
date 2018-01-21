import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = ( props ) =>
  <div className={classes.BuildControls}>
    
    <h2>Total price: <strong>{props.price.toFixed( 2 )}</strong>$</h2>
    
    {controls.map( ctrl =>
      
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded( ctrl.type )}
        removed={() => props.ingredientRemoved( ctrl.type )}
        ingrCount={props.ingredients[ctrl.type]}
      />
    )}
    
    <button className={classes.OrderButton}
            disabled={props.price < 4.1}
            onClick={props.orderClicked}>
      {props.isAuth ? 'ORDER NOW' : 'LOGIN TO CONTINUE'}
    </button>
  </div>

export default buildControls