import * as actionTypes from '../actions/ActionTypes'
import { getIngredientsPrices, INITIAL_PRICE } from "../../Helpers/PriceHelpers";

const initialState = {
  ingredients: null,
  totalPrice: INITIAL_PRICE,
  error: false
}

const reducer = ( state = initialState, action ) => {
  
  switch ( action.type ) {
    
    case actionTypes.SET_INGREDIENTS:
      
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }
    
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      
      return {
        ...state,
        error: true
      }
    
    case actionTypes.ADD_INGREDIENT:
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
    
    case actionTypes.REMOVE_INGREDIENT:
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