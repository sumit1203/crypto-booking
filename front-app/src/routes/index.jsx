import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableHome = Loadable({
    loader: () => import(
        /* webpackChunkName: "Home-page" */
        /* webpackMode: "lazy" */
        './Home'),
    loading() {
        return <div>Loading...</div>
    }
});

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LoadableHome} />
    </Switch>
  </BrowserRouter>

);

export default Routes;
