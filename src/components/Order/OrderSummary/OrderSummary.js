import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import CustomButton from '../../UI/Button/CustomButton'

class OrderSummary extends Component {
  
  componentWillUpdate() {
    console.log("OrderSummary will update")
  }
  
  render() {
  
    const ingredientsSummary = Object.keys( this.props.ingredients )
      .map( ingr => {
        return <li key={'summary' + ingr}>
          <span style={{textTransform: 'capitalize'}}>
            {ingr}: {this.props.ingredients[ingr]}
          </span>
        </li>
      } )
    
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <h4><u>Total: {this.props.totalPrice.toFixed(2)}$</u></h4>
        <p>Continue to checkout?</p>
        <CustomButton clicked={this.props.cancel} btnType={'Danger'}>CANCEL</CustomButton>
        <CustomButton clicked={this.props.continue} btnType={'Success'}>CONTINUE</CustomButton>
      </Aux>
    )
  }
}

export default OrderSummary