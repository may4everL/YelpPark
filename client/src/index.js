import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {configureStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore(reducers, compose(applyMiddleware(thunk)));

root.render(
  <Provider>
    <App />
  </Provider>,
  root
);