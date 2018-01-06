import React, { Component } from 'react'
import Button from '../../../components/UI/Button/CustomButton'
import classes from './ContactData.css'
import AxiosOrders from '../../../AxiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'

import {
  getIngredientsPrices, INITIAL_PRICE
} from '../../../Helpers/PriceHelpers'

class ContactData extends Component {
  
  orderHandler = ( event ) => {
    event.preventDefault()
    
    this.setState( { loading: true } )
    
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: INITIAL_PRICE + getIngredientsPrices( this.props.ingredients ),
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
  
  render() {
    const form = this.state && this.state.loading ? <Spinner/> :
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
          <input className={classes.Input} type='email' name='email' placeholder='Your email'/>
          <input className={classes.Input} type='text' name='street' placeholder='Street'/>
          <input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    return ( this.props.ingredients ? form : null )
  }
}

export default ContactData