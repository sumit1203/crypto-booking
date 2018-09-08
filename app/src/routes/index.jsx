import React from 'react';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { hot } from "react-hot-loader";
import Loader from '../components/Loader';
import MetaMask from '../sections/Booking/FormSection/CheckEmail'

const LoadableHome = Loadable({
    loader: () => import(
        /* webpackChunkName: "Home-page" */
        /* webpackMode: "lazy" */
        './Home'),
    loading() {
        return <Loader block={200} label="Loading..."/>
    }
});

const mockData = {
  txs: [{gas: 123, data: '0x123123', value: '0x0', to: '0x123123123'}],
  booking: {guestEthAddress: 'hola pepe'}
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/test" component={() => <MetaMask onClose={() => {}} instructions={mockData}/>}/>
      <Route path="/" component={LoadableHome} />
    </Switch>
  </BrowserRouter>

);

export default hot(module)(Routes);
