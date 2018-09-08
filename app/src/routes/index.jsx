import React from 'react';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import Web3 from 'web3';
import { Web3Context } from '../contexts/Web3Context';
import Loader from '../components/Loader';
import { WEB3_PROVIDER } from '../config';

const LoadableHome = Loadable({
  loader: () => import(
    /* webpackChunkName: "Home-page" */
    /* webpackMode: "lazy" */
    './Home',
  ),
  loading() {
    return <Loader block={200} label="Loading..." />;
  },
});

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.web3 = window.web3 ? new Web3(window.web3.currentProvider) : new Web3(WEB3_PROVIDER);
  }

  render() {
    return (
      <Web3Context.Provider value={this.web3}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LoadableHome} />
          </Switch>
        </BrowserRouter>
      </Web3Context.Provider>
    );
  }
}

export default hot(module)(Routes);
