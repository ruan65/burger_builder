import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngridient/BurgerIngredient'

const burger = (props) => {

  let staff = Object.keys( props.ingredients )
    .map( (ingrType) => {

        return [...Array(props.ingredients[ingrType])]
          .map((_, i) =>
            <BurgerIngredient type={ingrType} key={ingrType + i}/>
          )
      }
    )
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  if (staff.length === 0) {
    staff = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {staff}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
}

export default burger