import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Order from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/orders' exact render={() => <Order/>}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
