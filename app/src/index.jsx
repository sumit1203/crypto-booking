import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'
import App from './routes';
import 'windingtree-ui/src/css/app.scss';

const HotReloadedComponent = hot(module)(App)

ReactDOM.render(
    <HotReloadedComponent />,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}
