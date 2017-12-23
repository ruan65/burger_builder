import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: .5, cheese: .4, meat: 1.3, bacon: .7
}

class BurgerBuilder extends Component {
  
  constructor( props ) {
    super( props )
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    }
  }
  
  changeIngredientHandler = ( type, added ) => {
  
  
    console.log( 'changeIngr: ' + type + ' ' + added );
  
    const oldCount = this.state.ingredients[type]
    const updatedIngredients = { ...this.state.ingredients }
    
    updatedIngredients[type] = added ? oldCount < 3 ? oldCount + 1 : oldCount :
      oldCount > 0 ? oldCount - 1 : oldCount
    
    const oldPrice = this.state.totalPrice
    
    this.setState( {
      ingredients: updatedIngredients,
      totalPrice: oldPrice + INGREDIENT_PRICES[type]
    } )
  }
  
  render() {
    
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          ingredients={this.state.ingredients}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder