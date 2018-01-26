import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import axiosBurgerBuilder from '../../AxiosOrders'
import { addIngredient, removeIngredient, initIngredients,
  purchaseInit, setAuthRedirectAction } from '../../store/actions/indexActions'

export class BurgerBuilder extends Component {
  
  state = {
    ordered: false
  }
  
  componentDidMount() {
    this.props.onInitIngredients()
  }
  
  orderHandler = () => {
    if ( this.props.isAuthenticated ) {
      
      this.setState( { ordered: !this.state.ordered } )
      
    } else {
      
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }
  
  orderContinueHandler = () => {
    this.props.onPurchaseInit()
    this.props.history.push( '/checkout' )
  }
  
  render() {
    
    let burger = ( !this.props.ings
        ?
        ( this.props.error ? <p style={{ color: 'red', margin: '20px' }}>Ingredients can not be loaded!</p> :
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
            isAuth={this.props.isAuthenticated}
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
    //
    // if ( this.state.loading ) {
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
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    purchased: state.orderReducer.purchased,
    isAuthenticated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients: () => dispatch( initIngredients() ),
    onIngrAdded: ( name ) => dispatch( addIngredient( name ) ),
    onIngrRemoved: ( name ) => dispatch( removeIngredient( name ) ),
    onPurchaseInit: () => dispatch( purchaseInit() ),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectAction(path))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axiosBurgerBuilder ) )