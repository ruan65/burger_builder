import Action from '../actions/ActionTypes'
import {
  getIngredientsPrices, INGREDIENT_PRICES, INITIAL_PRICE
}
  from "../../Helpers/PriceHelpers";

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: INITIAL_PRICE
}


const reducer = ( state = initialState, action ) => {
  
  const count = state.ingredients[action.ingredientName]
  let num
  
  switch ( action.type ) {
    
    case Action.ADD_INGREDIENT:
      num =  count < 3 ? count + 1 : count
      break
    
    case Action.REMOVE_INGREDIENT:
      num = count > 0 ? count - 1 : count
      break
    
    default:
      return state
  }
  
  const ingredients = {
    ...state.ingredients,
    [action.ingredientName]: num
  }
  
  return {
    ...state,
    ingredients: ingredients,
    totalPrice: INITIAL_PRICE + getIngredientsPrices( ingredients )
  }
}

export default reducer