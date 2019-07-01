import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './components/App';
import Root from './Root';

import './index.scss';

ReactDOM.render(
  <Root>
    <App />
    <ToastContainer />
  </Root>,
  document.getElementById('root')
);
