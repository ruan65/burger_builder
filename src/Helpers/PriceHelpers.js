export const INGREDIENT_PRICES = {
  salad: .5, cheese: .4, meat: 1.3, bacon: .7
}

export const INITIAL_PRICE = 4

export const getIngredientsPrices = (ingredients) => !ingredients ? 0 :
  Object.keys( ingredients )
    .map( ingr => INGREDIENT_PRICES[ingr] * ingredients[ingr] )
    .reduce( ( total, ingrPrice  ) => total + ingrPrice, 0 )