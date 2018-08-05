import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import 'windingtree-ui/src/css/app.scss';
import '../src/css/app.scss';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}
