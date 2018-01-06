export const INGREDIENT_PRICES = {
  salad: .5, cheese: .4, meat: 1.3, bacon: .7
}

export const INITIAL_PRICE = 4

export const getIngredientsPrices = (ingredients) => !ingredients ? 0 :
  Object.keys( ingredients )
    .map( ingr => INGREDIENT_PRICES[ingr] * ingredients[ingr] )
    .reduce( ( total, ingrPrice ) => total + ingrPrice, 0 )


export const orderFormMockUp = {
  name: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Name'
    }
  },
  street: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'Street'
    }
  },
  zipCode: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'ZIP Code'
    }
  },
  email: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'email',
      placeholder: 'Email'
    }
  },
  deliveryMethod: {
    elementType: 'select',
    value: '',
    elementConfig: {
      options: [
        {value: 'fastest', displayValue: 'Fastest'},
        {value: 'free', displayValue: 'Free'},
        {value: 'normal', displayValue: 'Normal'}
      ]
    }
  }
}