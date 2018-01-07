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
    valid: false
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
    valid: false
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
      minLength: 5
    },
    valid: false
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
    valid: false
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
    },
    validation: {
      required: true
    },
    valid: false
  }
}