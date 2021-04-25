import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';

import { reducers } from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
      <Provider store={store}>
            <App style={{ backgroundImage: './images/Subtle-Prism.svg' }} />
      </Provider>,
      document.getElementById('root')
); 