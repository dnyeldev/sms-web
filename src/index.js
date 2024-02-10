import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { waitOnCache } from './App';
import * as serviceWorker from './serviceWorker';

const CAN_OFFLINE = JSON.parse(process.env.REACT_APP_CAN_OFFLINE);
const CACHE_FIRST = JSON.parse(process.env.REACT_APP_CACHE_FIRST);
if (CAN_OFFLINE) {
  console.log('offline mode');
  // offline capability for query
  waitOnCache().then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });

  // @Notes: For development testing, compile using yarn build first to enable offline capabilities
  // @Notes: For production build, https is required to enable offline capabilities
  serviceWorker.register();
} else if (CACHE_FIRST) {
  console.log('cache-first mode');

  waitOnCache().then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });

  serviceWorker.unregister();
} else {
  // normal fetching without offline mode
  ReactDOM.render(<App />, document.getElementById('root'));

  serviceWorker.unregister();
}
