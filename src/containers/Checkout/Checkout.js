import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  
  componentWillMount() {
    this.setState( { ingredients: this.props.location.state } )
  }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }
  
  checkoutContinuedHandler = () => {
    this.props.history.replace( '/checkout/contact-data' )
    
  }
  
  render() {
    return ( this.state.ingredients ?
        <div>
          <CheckoutSummary ingredients={this.state.ingredients}
                           checkoutCancelled={this.checkoutCancelledHandler}
                           checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route path={this.props.match.path + '/contact-data'}
                 render={(props) => <ContactData ingredients={this.state.ingredients} {...props}/>}
          />
        </div>
        : <h2>Nothing interesting here if you just entered url.</h2>
    )
  }
}

export default Checkout