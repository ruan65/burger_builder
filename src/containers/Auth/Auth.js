import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import classes from './Auth.css'
import { authForm, checkFormValidity, checkValidity, email } from '../../Helpers/Forms'

import Input from '../../components/UI/Input/Input'
import Button, { ButtonType } from '../../components/UI/Button/CustomButton'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { authAction, setAuthRedirectAction } from '../../store/actions/indexActions'

class Auth extends Component {
  
  state = {
    controls: authForm,
    isSignUp: true
  }
  
  componentDidMount() {
    if ( !this.props.buildingBurgerInProgress && this.props.authRedirectPath !== '/' ) {
      
      this.props.onSetAuthRedirectPath()
    }
  }
  
  inputChangedHandler = ( event, controlName ) => {
    
    const value = event.target.value
    
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
        touched: true
      }
    }
    
    this.setState( { controls: updatedControls } )
  }
  
  authHandler = ( ev ) => {
    
    ev.preventDefault()
    
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    )
  }
  
  switchAuthModeHandler = () => {
    
    this.setState( prevState => {
      return { isSignUp: !prevState.isSignUp }
    } )
  }
  
  render() {
    
    if (this.props.isAuthenticated) {

      return <Redirect to={this.props.authRedirectPath}/>
    }
    
    const formElementsArray = []
    
    for ( let key in this.state.controls ) {
      
      formElementsArray.push( { id: key, config: this.state.controls[key] } )
    }
    
    const formElements = formElementsArray.map( ( formElement, i ) => {
        const config = formElement.config
        return ( <Input
            key={formElement.id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            shouldValidate={config.validation}
            touched={config.touched}
            invalid={!config.valid}
            changed={( event ) => this.inputChangedHandler( event, formElement.id )}
          />
        )
      }
    )
    
    let errorMessage = null
    
    if ( this.props.error ) {
      errorMessage = <p>{this.props.error.message}</p>
    }
    
    
    const content = this.props.loading ? <Spinner/> :
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.authHandler}>
          {formElements}
          <Button btnType={ButtonType.Success}>{this.state.isSignUp ? 'SIGN UP' : 'SING IN'}</Button>
        </form>
        <Button
          btnType={ButtonType.Danger}
          clicked={this.switchAuthModeHandler}
        >SWITCH TO "{this.state.isSignUp ? 'SING IN' : 'SIGN UP'}" </Button>
      </div>
    
    
    return content
  }
}

const mapStateToProps = state => {
  return {
    error: state.authReducer.error,
    loading: state.authReducer.loading,
    isAuthenticated: state.authReducer.token !== null,
    buildingBurgerInProgress: state.burgerBuilderReducer.building,
    authRedirectPath: state.authReducer.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( email, pwd, isSignUp ) => dispatch( authAction( email, pwd, isSignUp ) ),
    onSetAuthRedirectPath: () => dispatch( setAuthRedirectAction( '/' ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Auth )