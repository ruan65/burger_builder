import * as actionTypes from '../actions/ActionTypes'
import { updateObj } from '../Utils'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

export const reducer = ( state = initialState, action ) => {
  
  switch ( action.type ) {
    
    case actionTypes.AUTH_START:
      
      return updateObj( state, { error: null, loading: true } )
    
    case actionTypes.AUTH_SUCCESS:
      
      return updateObj( state, {
        error: null,
        loading: false,
        token: action.token,
        userId: action.userId
      } )
    
    case actionTypes.AUTH_FAILED:
      
      return updateObj( state, { error: action.error, loading: false } )
    
    case actionTypes.AUTH_LOGOUT:
      
      return updateObj( state, { token: null, userId: null } )
    
    case actionTypes.AUTH_SET_REDIRECT_PATH:
      
      return updateObj( state, { authRedirectPath: action.path } )
    
    default:
      return state
  }
}

export default reducer