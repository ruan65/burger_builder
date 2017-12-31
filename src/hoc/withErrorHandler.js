import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'
import Aux from './Aux'

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    
    state = {
      error: null
    }
    
    componentWillMount() {
      
      this.requestInterseptors = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })
      
      this.responseInterseptors = axios.interceptors.response.use(res => res, err => {
        this.setState({ error: err })
      })
    }
    
    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterseptors)
      axios.interceptors.response.eject(this.responseInterseptors)
    }
    
    errorConfirmedHandler = () => {

      this.setState({error: null})
    }
    
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            <p style={{ color: 'red' }}>Something did not work!</p>
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler