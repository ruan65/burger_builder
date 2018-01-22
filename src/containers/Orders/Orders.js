import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from './Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import AxiosOrders from "../../AxiosOrders"
import withErrorHandler from '../../hoc/withErrorHandler'
import { fetchOrders } from '../../store/actions/indexActions'


class Orders extends Component {
  
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }
  
  render() {
    
    let orders = <h4>No Orders</h4>
      
      if(this.props.orders) {
        
        orders = this.props.loading ? <Spinner/> :
          Object.entries( this.props.orders )
          .map( order => <Order order={order[1]} key={order[0]}/> )
      }
    
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    error: state.orderReducer.error,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch( fetchOrders(token, userId) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, AxiosOrders ) )