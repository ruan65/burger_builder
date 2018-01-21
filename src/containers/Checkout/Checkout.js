import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }
  
  checkoutContinuedHandler = () => {
    this.props.history.replace( this.props.match.path + '/contact-data' )
    
  }
  
  render() {
    
    const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null
    
    const summary =
      <div>
        {purchasedRedirect}
        <CheckoutSummary ingredients={this.props.ingredients}
                         checkoutCancelled={this.checkoutCancelledHandler}
                         checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.path + '/contact-data'}
               exact
               component={ContactData}
        />
      </div>
    
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  }
}

export default connect( mapStateToProps )( Checkout )