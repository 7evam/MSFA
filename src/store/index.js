// import {configureStore, applyMiddleware, compose} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers'
import { loadState, saveState } from '../utils/localStorage'


import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistedState = loadState();

const persistConig = {
  key: 'root',
  storage
}

// change to only be user reducer
const persistedReducer = persistReducer(persistConig, rootReducer)

  // const middleware = [
  //   thunk,
  //   // routerMiddleware(browserHistory),
  //   // clientMiddleware(apiClient),
  //   // actionCallback,
  // ];

// const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

export const store = configureStore({
  reducer: persistedReducer, 
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store)

// everything here will be persisted in local storage
// store.subscribe(() => {
//   saveState({
//     authReducer: store.getState().authReducer
//   });
// });

export default store;