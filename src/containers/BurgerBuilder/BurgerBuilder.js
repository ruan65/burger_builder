import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import AxiosOrders from '../../AxiosOrders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: .5, cheese: .4, meat: 1.3, bacon: .7
}

const INITIAL_PRICE = 4

class BurgerBuilder extends Component {
  
  getIngredientsPrices = () => {
    
    return !this.state.ingredients ? 0 :
      Object.keys(this.state.ingredients)
        .map(ingr => INGREDIENT_PRICES[ingr] * this.state.ingredients[ingr])
        .reduce(( total, price ) => total + price, 0)
  }
  
  state = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    ordered: false,
    loading: false
  }
  
  componentDidMount() {
    
    AxiosOrders.get('/ingredients.json').then(resp => {
      this.setState({ ingredients: resp.data })
      
      console.log("ingr: " + this.getIngredientsPrices())
      
      if (this.state.ingredients) {
        
        this.setState({totalPrice: INITIAL_PRICE + this.getIngredientsPrices()})
      }
      
    })
  }
  
  orderHandler = () => {
    this.setState({ ordered: !this.state.ordered })
  }
  
  changeIngredientHandler = ( type, added ) => {
    
    
    console.log('changeIngr: ' + type + ' ' + added);
    
    const oldCount = this.state.ingredients[type]
    const updatedIngredients = { ...this.state.ingredients }
    
    updatedIngredients[type] = added ? oldCount < 3 ? oldCount + 1 : oldCount :
      oldCount > 0 ? oldCount - 1 : oldCount
    
    const oldPrice = this.state.totalPrice
    const ingrPrice = INGREDIENT_PRICES[type]
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: added ? oldPrice + ingrPrice : oldPrice - ingrPrice
    })
  }
  
  orderContinueHandler = () => {
    
    this.setState({ loading: true })
    
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Andrew',
        address: {
          street: 'Bratislavskaya',
          zipCode: '109451',
          city: 'Moscow'
        },
        email: 'ruan65@ya.ru'
      },
      deliveryMethod: 'fastest'
    }
    
    AxiosOrders.post('/orders.json', order)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log('Inside finally')
        this.setState({ loading: false, ordered: false })
      })
  }
  
  render() {
    
    let burger = !this.state.ingredients ? <Spinner/> : (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          orderClicked={this.orderHandler}
        />
      </Aux>
    )
    
    let orderSummary = !this.state.ingredients ? null : (
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        continue={this.orderContinueHandler}
        cancel={this.orderHandler}
      />
    )
    
    if (this.state.loading) {
      
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

export default withErrorHandler(BurgerBuilder, AxiosOrders)