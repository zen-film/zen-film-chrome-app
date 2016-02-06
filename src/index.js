import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { devTools, persistState } from 'redux-devtools';
import DiffMonitor from 'redux-devtools-diff-monitor';

import reducer from './reducers/index.js';
import './index.css'

const initialState = {
  user : {
    lastSyncDatestamp: Number,
    isLogin: false
  },
  photos: [
    {
      key: 1,
      selected: false,
      url: 'url(http://lorempixel.com/200/200/)'
    },
    {
      key: 3,
      selected: false,
      url: 'url(http://lorempixel.com/200/200/people)'
    },
    {
      key: 2,
      selected: true,
      url: 'url(http://lorempixel.com/200/200/sports)'
    }
  ],
  unSavedMeta: {},
  showUserSettings: false
}

const createStoreWithMiddlewares = compose(
   persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

var store = createStoreWithMiddlewares(reducer, initialState);
ReactDOM.render(
    <Provider store={store}>
       <App className="App" />
    </Provider>,
    document.getElementById('root'));
