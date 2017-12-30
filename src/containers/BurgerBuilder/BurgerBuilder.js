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

class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    ordered: false,
    loading: false
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
  
  orderHandler = () => {
    this.setState({ ordered: !this.state.ordered })
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
    
    let orderSummary =
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        continue={this.orderContinueHandler}
        cancel={this.orderHandler}
      />
    
    if (this.state.loading) {
      
      orderSummary = <Spinner/>
    }
    
    return (
      <Aux>
        <Modal show={this.state.ordered} modalClosed={this.orderHandler}>
          {orderSummary}
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

export default withErrorHandler(BurgerBuilder, AxiosOrders)