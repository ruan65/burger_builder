import * as actionTypes from '../actions/ActionTypes'

const initialState = {}

export const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.AUTH_START:

      return {
        ...state,
      }

    default:
      return state
  }
}

export default reducer