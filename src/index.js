import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './Router';
import { Provider } from 'react-redux';
import { store, persistor }  from './store'
import { PersistGate } from 'redux-persist/integration/react';

// import * as serviceWorker from './serviceWorker';

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router />
        </PersistGate>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
