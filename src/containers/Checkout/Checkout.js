import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

  componentWillMount() {
    console.log(this.props)
    this.setState({ingredients: this.props.location.state})
  }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  
    // this.setState({ loading: true })
    //
    // const order = {
    //   ingredients: this.state.ingredients,
    //   totalPrice: this.state.totalPrice,
    //   customer: {
    //     name: 'Andrew',
    //     address: {
    //       street: 'Bratislavskaya',
    //       zipCode: '109451',
    //       city: 'Moscow'
    //     },
    //     email: 'ruan65@ya.ru'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    //
    // AxiosOrders.post('/orders.json', order)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    //   .finally(() => {
    //     console.log('Inside finally')
    //     this.setState({ loading: false, ordered: false })
    //   })
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

export default Checkout