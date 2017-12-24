import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
  render() {
    return (
        <Layout>
          <Toolbar/>
          <BurgerBuilder/>
        </Layout>
    );
  }
}

export default App;
