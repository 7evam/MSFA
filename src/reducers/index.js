import { combineReducers } from 'redux';
import authReducer from './authReducer'
import {removeState} from '../utils/localStorage'

  const combinedReducer = combineReducers({
      authReducer
  })

  const rootReducer = (state, action) => {
    removeState()
    if(action.type === 'LOGOUT'){
      state = undefined
    }
    return combinedReducer(state, action)
  }

export default rootReducer