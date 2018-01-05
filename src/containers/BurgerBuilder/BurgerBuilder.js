import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary'
import AxiosOrders from '../../AxiosOrders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

import {
  getIngredientsPrices, INITIAL_PRICE, INGREDIENT_PRICES
}
  from '../../Helpers/PriceHelpers'

class BurgerBuilder extends Component {
  
  state = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    ordered: false,
    loading: false,
    error: false
  }
  
  componentDidMount() {
    
    AxiosOrders.get( '/ingredients.json' )
      .then( resp => {
        this.setState( { ingredients: resp.data } )
        
        if ( this.state.ingredients ) {
          
          this.setState( { totalPrice: INITIAL_PRICE + getIngredientsPrices( this.state.ingredients ) } )
        }
        
      } )
      .catch( err => {
        this.setState( { error: true } )
      } )
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
  
  orderContinueHandler = () => {
    
    this.props.history.push(
      {
        pathname: '/checkout',
        state: this.state.ingredients
      }
    )
  }
  
  render() {
    
    let burger = !this.state.ingredients
      ?
      ( this.state.error ? <p style={{ color: 'red', margin: '20px' }}>Ingredients can not be loaded!</p> : <Spinner/> )
      :
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          orderClicked={this.orderHandler}
        />
      </Aux>
    
    let orderSummary = !this.state.ingredients ? null : (
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        continue={this.orderContinueHandler}
        cancel={this.orderHandler}
      />
    )
    
    if ( this.state.loading ) {
      
      orderSummary = <Spinner/>
    }
    
    return (
      <Aux>
        <Modal show={this.state.ordered} modalClosed={this.orderHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler( BurgerBuilder, AxiosOrders )