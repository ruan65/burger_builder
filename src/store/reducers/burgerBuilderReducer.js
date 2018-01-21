import * as actionTypes from '../actions/ActionTypes'
import { getIngredientsPrices, INITIAL_PRICE } from "../../Helpers/PriceHelpers";
import { updateObj } from "../Utils";

const initialState = {
  ingredients: null,
  totalPrice: INITIAL_PRICE,
  error: false,
  building: true
}

const reducer = ( state = initialState, action ) => {
  
  switch ( action.type ) {
    
    case actionTypes.SET_INGREDIENTS:
      return updateObj( state,
        {
          ingredients: action.ingredients,
          totalPrice: INITIAL_PRICE + getIngredientsPrices( ingredients ),
          error: false,
          building: false
        } )
    
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObj( state, { error: true } )
    
    case actionTypes.ADD_INGREDIENT:
      
      const count = state.ingredients[action.ingredientName]
      
      const ingredients = {
        ...state.ingredients,
        [action.ingredientName]: count < 3 ? count + 1 : count
      }
      return updateObj( state,
        {
          ingredients,
          totalPrice: INITIAL_PRICE + getIngredientsPrices( ingredients ),
          building: true
        } )
    
    case actionTypes.REMOVE_INGREDIENT:
      const count_r = state.ingredients[action.ingredientName]
      const ingredients_r = {
        ...state.ingredients,
        [action.ingredientName]: count_r > 0 ? count_r - 1 : count_r
      }
      return updateObj(state, {
        ingredients: ingredients_r,
        totalPrice: INITIAL_PRICE + getIngredientsPrices( ingredients_r ),
        building: true
      })
    
    default:
      return state
  }
}

export default reducer