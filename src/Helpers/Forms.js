export const email =
  {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'email',
      placeholder: 'Email'
    },
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  }

export const name =
  {
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
  }

export const password =
  {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  }

export const street = {
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
}

export const zipCode =
  {
    elementType: 'input',
    value: '',
    elementConfig: {
      type: 'text',
      placeholder: 'ZIP Code'
    },
    validation: {
      required: true,
      minLength: 5,
      maxLength: 6
    },
    valid: false,
    touched: false
  }

export const deliveryMethod =
  {
    elementType: 'select',
    value: 'fastest',
    elementConfig: {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'free', displayValue: 'Free' },
        { value: 'normal', displayValue: 'Normal' }
      ]
    }
  }

export const orderForm = {
  name,
  street,
  zipCode,
  email,
  deliveryMethod
}

export const authForm = {
  email,
  password,
}

export function checkValidity(value, rules) {

  if (!rules || !rules.required) return true

  let isValid = value.trim() !== ''

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }
  return isValid
}

export function checkFormValidity(form) {

  return Object.values( form )
    .map( el => el.validation ? el.valid : true )
    .reduce( (valid, el) => valid && el, true )
}