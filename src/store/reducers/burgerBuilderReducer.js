import * as Action from '../actions/ActionTypes'
import {
  getIngredientsPrices, INGREDIENT_PRICES, INITIAL_PRICE
}
  from "../../Helpers/PriceHelpers";

const initialState = {
  ingredients: null,
  totalPrice: INITIAL_PRICE,
  error: false
}

const reducer = ( state = initialState, action ) => {
  
  switch ( action.type ) {
    
    case Action.SET_INGREDIENTS:
      
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }
    
    case Action.FETCH_INGREDIENTS_FAILED:
      
      return {
        ...state,
        error: true
      }
    
    case Action.ADD_INGREDIENT:
      const count = state.ingredients[action.ingredientName]
      const ingredients = {
        ...state.ingredients,
        [action.ingredientName]: count < 3 ? count + 1 : count
      }
      return {
        ...state,
        ingredients,
        totalPrice: INITIAL_PRICE + getIngredientsPrices( ingredients )
      }
    
    case Action.REMOVE_INGREDIENT:
      const count_r = state.ingredients[action.ingredientName]
      const ingredients_r = {
        ...state.ingredients,
        [action.ingredientName]: count_r > 0 ? count_r - 1 : count_r
      }
      return {
        ...state,
        ingredients: ingredients_r,
        totalPrice: INITIAL_PRICE + getIngredientsPrices( ingredients_r )
      }
    default:
      return state
  }
}

export default reducer