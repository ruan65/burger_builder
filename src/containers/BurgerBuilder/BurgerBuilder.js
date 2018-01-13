import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import {addIngredient, removeIngredient, initIngredients} from '../../store/actions/indexActions'
import axiosBurgerBuilder from '../../AxiosOrders'
import burgerBuilderReducer from "../../store/reducers/burgerBuilderReducer";

class BurgerBuilder extends Component {
  
  state = {
    ordered: false
  }
  
  componentDidMount() {
    this.props.initIngredients()
  }
  
  orderHandler = () => {
    this.setState( { ordered: !this.state.ordered } )
  }
  
  orderContinueHandler = () => {
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
    error: state.burgerBuilderReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initIngredients: ()     => dispatch(initIngredients()),
    onIngrAdded: ( name )   => dispatch( addIngredient( name ) ),
    onIngrRemoved: ( name ) => dispatch( removeIngredient( name ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axiosBurgerBuilder ) )