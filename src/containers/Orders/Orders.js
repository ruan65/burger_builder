import React, { Component } from 'react'
import Order from './Order/Order'
import AxiosOrders from "../../AxiosOrders"
import withErrorHandler from '../../hoc/withErrorHandler'

class Orders extends Component {
  
  state = {
    orders: null,
    error: false,
    loading: false
  }
  
  componentDidMount() {
    
    this.setState( { loading: true } )
    
    AxiosOrders.get( '/orders.json' )
      .then( resp => {
        this.setState( { orders: resp.data } )
        
      } )
      .catch( err => {
        this.setState( { error: true } )
      } )
      .finally( () => this.setState( { loading: false } ) )
  }
  
  render() {
    
    const orders = this.state.orders
      
      ? Object.entries(this.state.orders)
        .map( order => <Order order={order[1]} key={order[0]}/> )
      
      : <h4>No Orders</h4>
    
    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default withErrorHandler(Orders, AxiosOrders)