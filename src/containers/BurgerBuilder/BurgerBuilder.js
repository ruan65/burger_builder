import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary'
import AxiosOrders from '../../AxiosOrders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import Actions from '../../store/Actions'

import {
  getIngredientsPrices, INITIAL_PRICE, INGREDIENT_PRICES
}
  from '../../Helpers/PriceHelpers'

class BurgerBuilder extends Component {

  state = {
    totalPrice: INITIAL_PRICE,
    ordered: false,
    loading: false,
    error: false
  }

  componentDidMount() {

    // AxiosOrders.get( '/ingredients.json' )
    //   .then( resp => {
    //     this.setState( { ingredients: resp.data } )
    //
    //     if ( this.state.ingredients ) {
    //
    //       this.setState( { totalPrice: INITIAL_PRICE + getIngredientsPrices( this.state.ingredients ) } )
    //     }
    //
    //   } )
    //   .catch( err => {
    //     this.setState( { error: true } )
    //   } )
  }

  orderHandler = () => {
    this.setState( { ordered: !this.state.ordered } )
  }

  changeIngredientHandler = (type, added) => {

    const oldCount = this.props.ings[type]
    const updatedIngredients = { ...this.props.ings }

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
        state: this.props.ings
      }
    )
  }

  render() {

    let burger = (!this.props.ings
      ?
      (this.state.error ? <p style={{ color: 'red', margin: '20px' }}>Ingredients can not be loaded!</p> : <Spinner/>)
      :
      <Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          ingredients={this.props.ings}
          price={this.state.totalPrice}
          orderClicked={this.orderHandler}
        />
      </Aux>
    )

    let orderSummary = !this.props.ings ? null : (
      <OrderSummary
        ingredients={this.props.ings}
        totalPrice={this.state.totalPrice}
        continue={this.orderContinueHandler}
        cancel={this.orderHandler}
      />
    )

    // if (this.state.loading) {
    //
    //   orderSummary = <Spinner/>
    // }

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

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngrAdded: (name) => dispatch({type: Actions.ADD_INGREDIENT, ingredientName: name}),
    onIngrRemoved: (name) => dispatch({type: Actions.REMOVE_INGREDIENT, ingredientName: name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, AxiosOrders ))