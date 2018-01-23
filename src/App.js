import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Order from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/indexActions'

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  
  render() {
    
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    
    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path='/orders' exact render={() => <Order/>}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to={this.props.authRedirectPath}/>
        </Switch>
      )
    }
    
    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    authRedirectPath: state.authReducer.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch( authCheckState() )
  }
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) )
