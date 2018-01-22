import React, { Component } from 'react'
import Button, { ButtonType  } from '../../../components/UI/Button/CustomButton'
import classes from './ContactData.css'
import AxiosOrders from '../../../AxiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler'

import { orderForm, checkFormValidity, checkValidity } from '../../../Helpers/Forms'
import { getIngredientsPrices, INITIAL_PRICE } from '../../../Helpers/PriceHelpers'
import { purchaseBurger } from '../../../store/actions/indexActions'

class ContactData extends Component {

  state = {
    orderForm,
    enableSubmitButton: false
  }

  orderHandler = (event) => {

    event.preventDefault()

    const formData = {}

    for (let formElemId in this.state.orderForm) {

      formData[formElemId] = this.state.orderForm[formElemId].value
    }

    const order = {
      ingredients: this.props.ings,
      totalPrice: INITIAL_PRICE + getIngredientsPrices( this.props.ings ),
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onPurchaseBurger( order, this.props.token )
  }

  inputChangedHandler = (event, inputId) => {

    const value = event.target.value

    const updatedForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedForm[inputId] }

    updatedFormElement.touched = true
    updatedFormElement.value = value
    updatedFormElement.valid = checkValidity( value, updatedFormElement.validation )
    updatedForm[inputId] = updatedFormElement
    const submitEnable = checkFormValidity( updatedForm )
    this.setState( {
      orderForm: updatedForm,
      enableSubmitButton: submitEnable
    } )
  }

  render() {

    const formElementsArray = []

    for (let key in this.state.orderForm) {

      formElementsArray.push( { id: key, config: this.state.orderForm[key] } )
    }

    const form = this.props.loading ? <Spinner/> :
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form onSubmit={this.orderHandler}>
          {
            formElementsArray.map( (formElement, i) => {
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
          }
          <Button
            btnType={ButtonType.Success}
            disabled={!this.state.enableSubmitButton}
          >ORDER</Button>
        </form>
      </div>
    return (this.props.ings ? form : null)
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (order, token) => dispatch( purchaseBurger( order, token ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, AxiosOrders ) )