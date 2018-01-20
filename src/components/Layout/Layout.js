import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
  
  state = {
    showSideDrawer: false
  }
  
  sideDrawerCloseHandler = () => {
    this.setState( { showSideDrawer: false } )
  }
  
  sideDrawerShowHandler = () => {
    this.setState( { showSideDrawer: true } )
  }
  
  render() {
    return (
      <Aux>
        <Toolbar showSideDrawer={this.sideDrawerShowHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

export default connect( mapStateToProps )( Layout )