import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
      totalPrice: 4,
      ordered: false
    }
  }
  
  orderHandler = () => {
    this.setState( { ordered: !this.state.ordered } )
  }
  
  changeIngredientHandler = ( type, added ) => {
    
    
    console.log( 'changeIngr: ' + type + ' ' + added );
    
    const oldCount = this.state.ingredients[type]
    const updatedIngredients = { ...this.state.ingredients }
    
    updatedIngredients[type] = added ? oldCount < 3 ? oldCount + 1 : oldCount :
      oldCount > 0 ? oldCount - 1 : oldCount
    
    const oldPrice = this.state.totalPrice
    const ingrPrice = INGREDIENT_PRICES[type]
    
    this.setState( {
      ingredients: updatedIngredients,
      totalPrice: added ? oldPrice + ingrPrice : oldPrice - ingrPrice
    } )
  }
  
  render() {
    
    // let orderSummary = null
    //
    // if (this.state.ordered) {
    //   orderSummary =
    //     <Modal>
    //       <OrderSummary ingredients={this.state.ingredients}/>
    //     </Modal>
    // }
    
    return (
      <Aux>
        <Modal show={this.state.ordered}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          orderClicked={this.orderHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder