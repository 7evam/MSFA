import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sportReducer from './sportReducer';
import modalReducer from './modalReducer';
import { removeState } from '../utils/localStorage';

const combinedReducer = combineReducers({
  authReducer,
  sportReducer,
  modalReducer,
});

const rootReducer = (state, action) => {
  removeState();
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
