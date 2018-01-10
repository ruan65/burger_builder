import Action from './Actions'

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 4
}

const reducer = (state = initialState, action) => {
  
  const count = state.ingredients[action.ingredientName]

  switch (action.type) {
    case Action.ADD_INGREDIENT:
      return { ...state, ingredients: { ...state.ingredients,
          [action.ingredientName]: count < 3 ? count + 1 : count } }

    case Action.REMOVE_INGREDIENT:
      return { ...state, ingredients: { ...state.ingredients,
          [action.ingredientName]: count > 0 ? count - 1 : count } }
    default:
      return state
  }
}

export default reducer