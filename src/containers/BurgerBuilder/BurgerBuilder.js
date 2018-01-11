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

class BurgerBuilder extends Component {
  
  state = {
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
  
  orderContinueHandler = () => {
    this.props.history.push('/checkout')
  }
  
  render() {
    
    let burger = ( !this.props.ings
        ?
        ( this.state.error ? <p style={{ color: 'red', margin: '20px' }}>Ingredients can not be loaded!</p> :
          <Spinner/> )
        :
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngrAdded}
            ingredientRemoved={this.props.onIngrRemoved}
            ingredients={this.props.ings}
            price={this.props.price}
            orderClicked={this.orderHandler}
          />
        </Aux>
    )
    
    let orderSummary = !this.props.ings ? null : (
      <OrderSummary
        ingredients={this.props.ings}
        totalPrice={this.props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngrAdded: ( name ) => dispatch( { type: Actions.ADD_INGREDIENT, ingredientName: name } ),
    onIngrRemoved: ( name ) => dispatch( { type: Actions.REMOVE_INGREDIENT, ingredientName: name } )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, AxiosOrders ) )