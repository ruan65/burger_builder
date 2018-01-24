import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/indexActions'
import { asyncComponent } from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  
  render() {
    
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    
    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path='/orders' exact component={asyncOrders}/>
          <Route path='/checkout' component={asyncCheckout}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={asyncAuth}/>
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
