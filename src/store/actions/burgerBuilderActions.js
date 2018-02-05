import * as ActionTypes from './ActionTypes'

export const addIngredient = ( ingredientName) => {
  return {
    type: ActionTypes.ADD_INGREDIENT,
    ingredientName
  }
}

export const removeIngredient = ( ingredientName) => {
  return {
    type: ActionTypes.REMOVE_INGREDIENT,
    ingredientName
  }
}

export const setIngredients = ( ingredients ) => {
  return {
    type: ActionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: ActionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return {
    type: ActionTypes.FETCH_INGREDIENTS_FROM_SERVER
  }
}