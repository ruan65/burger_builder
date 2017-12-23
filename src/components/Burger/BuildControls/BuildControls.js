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
    
    <h1>Total price: <strong>{props.price.toFixed(2)}</strong>$</h1>
    
    {controls.map( ctrl =>
      
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientChange(ctrl.type, true)}
        removed={() => props.ingredientChange(ctrl.type, false)}
        ingrCount={props.ingredients[ctrl.type]}
      />
    )}
  
  </div>

export default buildControls