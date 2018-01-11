import React, { Component } from 'react'
import { Route } from 'react-router-dom'
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
    return (this.props.ingredients ?
        <div>
          <CheckoutSummary ingredients={this.props.ingredients}
                           checkoutCancelled={this.checkoutCancelledHandler}
                           checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route path={this.props.match.path + '/contact-data'}
                 render={(props) => <ContactData />}
          />
        </div>
        : <h2>Nothing interesting here if you just entered url.</h2>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

export default connect( mapStateToProps )( Checkout )