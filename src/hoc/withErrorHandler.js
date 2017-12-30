import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'
import Aux from './Aux'

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    
    state = {
      error: null
    }
    
    componentDidMount () {
      axios.interceptors.response.use(null, err => {
        this.setState({error: err})
      })
    }
    
    render() {
      return (
        <Aux>
          <Modal show={this.state.error}>
            Something went wrong....
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler