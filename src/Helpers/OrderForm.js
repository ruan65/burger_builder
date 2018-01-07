export const orderFormMockUp = {
  name: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Name'
    },
    validation: {
      required: true,
      minLength: 2
    },
    valid: false,
    touched: false
  },
  street: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'Street'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  zipCode: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'ZIP Code'
    },
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5
    },
    valid: false,
    touched: false
  },
  email: {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'email',
      placeholder: 'Email'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  deliveryMethod: {
    elementType: 'select',
    value: 'fastest',
    elementConfig: {
      options: [
        {value: 'fastest', displayValue: 'Fastest'},
        {value: 'free', displayValue: 'Free'},
        {value: 'normal', displayValue: 'Normal'}
      ]
    },
    valid: false,
    touched: false
  }
}