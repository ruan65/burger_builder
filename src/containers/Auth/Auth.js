import React, { Component } from 'react'
import classes from './Auth.css'
import { authForm, checkFormValidity, checkValidity } from '../../Helpers/Forms'

import Input from '../../components/UI/Input/Input'
import Button, { ButtonType } from '../../components/UI/Button/CustomButton'

class Auth extends Component {

  state = {
    controls: authForm
  }

  inputChangedHandler = (event, controlName) => {

    const value = event.target.value

    const updatedControls = {
      ...this.state.controls,
      [controlName] : {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({controls: updatedControls})
  }

  render() {

    const formElementsArray = []

    for (let key in this.state.controls) {

      formElementsArray.push( { id: key, config: this.state.controls[key] } )
    }

    const formElements = formElementsArray.map( (formElement, i) => {
        const config = formElement.config
        return (
          <Input
            key={formElement.id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            shouldValidate={config.validation}
            touched={config.touched}
            invalid={!config.valid}
            changed={(event) => this.inputChangedHandler( event, formElement.id )}
          />
        )
      }
    )

    return (
      <div className={classes.Auth}>
        <form>
          {formElements}
          <Button btnType={ButtonType.Success}>SUBMIT</Button>
        </form>
      </div>
    )
  }
}

export default Auth