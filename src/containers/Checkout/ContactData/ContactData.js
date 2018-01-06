import React, { Component } from 'react'
import Button from '../../../components/UI/Button/CustomButton'
import classes from './ContactData.css'
import AxiosOrders from '../../../AxiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import {
  getIngredientsPrices, INITIAL_PRICE, orderFormMockUp
} from '../../../Helpers/PriceHelpers'

class ContactData extends Component {
  
  state = {
    orderForm: orderFormMockUp
  }
  
  orderHandler = ( event ) => {
    event.preventDefault()
    
    this.setState( { loading: true } )
    
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: INITIAL_PRICE + getIngredientsPrices( this.props.ingredients ),
      
    }
    
    AxiosOrders.post( '/orders.json', order )
      .then( response => {
        console.log( response )
        this.props.history.replace( '/' )
      } )
      .catch( err => {
        console.log( err )
        this.setState( { loading: false } )
      } )
  }
  
  inputChangedHandler = (event, inputId) => {
    
    const value = event.target.value
    const updatedForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedForm[inputId]}
    
    updatedFormElement.value = value
    updatedForm[inputId] = updatedFormElement
    
    this.setState({orderForm: updatedForm})
  }
  
  render() {
    
    const formElementsArray = []
    
    for ( let key in this.state.orderForm ) {
      
      formElementsArray.push( { id: key, config: this.state.orderForm[key] } )
    }
    
    const form = this.state && this.state.loading ? <Spinner/> :
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form>
          {
            formElementsArray.map( ( formElement, i ) => {
                const config = formElement.config
                return (
                  <Input
                    key={formElement.id}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    value={config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  />
                )
              }
            )
          }
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    return ( this.props.ingredients ? form : null )
  }
}

export default ContactData