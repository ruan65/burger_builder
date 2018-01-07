import React, { Component } from 'react'
import Button from '../../../components/UI/Button/CustomButton'
import classes from './ContactData.css'
import AxiosOrders from '../../../AxiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import { orderFormMockUp } from '../../../Helpers/OrderForm'
import { getIngredientsPrices, INITIAL_PRICE } from '../../../Helpers/PriceHelpers'

class ContactData extends Component {
  
  state = {
    orderForm: orderFormMockUp
  }
  
  orderHandler = ( event ) => {
    event.preventDefault()
    
    this.setState( { loading: true } )
    
    const formData = {}
    
    for (let formElemId in this.state.orderForm) {

      formData[formElemId] = this.state.orderForm[formElemId].value
    }
    
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: INITIAL_PRICE + getIngredientsPrices( this.props.ingredients ),
      orderData: formData
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
  
  checkValidity(value, rules) {
    if (!rules.required) return true
    let valid = value.trim() !== ''
    if (rules.minLength) {
      valid = value.length >= rules.minLength
    }
    return  valid
  }
  
  inputChangedHandler = (event, inputId) => {
    
    const value = event.target.value
    
    const updatedForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedForm[inputId]}
    
    updatedFormElement.value = value
    updatedFormElement.valid = this.checkValidity(value, updatedFormElement.validation)
    updatedForm[inputId] = updatedFormElement
    console.log(updatedFormElement)
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
        <form  onSubmit={this.orderHandler}>
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
          <Button btnType='Success'>ORDER</Button>
        </form>
      </div>
    return ( this.props.ingredients ? form : null )
  }
}

export default ContactData