import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from "./store/store";
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
