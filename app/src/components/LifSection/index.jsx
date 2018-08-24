import React from 'react';

import logoIdex from "../../img/content/cards/idex.svg";
import logoYobit from "../../img/content/cards/yobit.png";
import logoOpenledger from "../../img/content/cards/openledger.png";
import logoForkdelta from "../../img/content/cards/forkdelta.png";

const LifSection = () => (
  <article className="py-3 py-md-4" id="paying-with-lif">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <h2 className="mb-2 mb-md-4 text-center">
            Paying with Lif
          </h2>
          <p className="lead mb-2 mb-md-3 text-center text-md-left">
              There were 24,976,541.45 Lífs generated and distributed between team and backers. No&nbsp;new token generation expected, so&nbsp;the only way to&nbsp;get Lífs is&nbsp;to&nbsp;buy from existing holders on&nbsp;cryptocurrency exchanges.
          </p>

          <div className="card-deck">

            <a href="https://idex.market/" target="_blank" rel="noopener noreferrer" className="card card-sm">
              <div className="card-header d-none d-md-block text-center">
                  <img src={logoIdex} alt="IDEX" className="img-fluid"/>
              </div>

              <div className="card-body d-flex flex-column small">
                <h6 className="card-title text-muted">
                  <img src={logoIdex} alt="IDEX" className="d-md-none"/>
                  IDEX
                  <i className="mdi mdi-24px mdi-chevron-right d-md-none"></i>
                </h6>
              </div>
            </a>

            <a href="http://yobit.io/" target="_blank" rel="noopener noreferrer" className="card card-sm">
              <div className="card-header d-none d-md-block text-center">
                <img src={logoYobit} alt="YObit" className="img-fluid"/>
              </div>

              <div className="card-body d-flex flex-column small">
                <h6 className="card-title text-muted">
                  <img src={logoYobit} alt="YObit" className="d-md-none"/>
                  YObit
                  <i className="mdi mdi-24px mdi-chevron-right d-md-none"></i>
                </h6>
              </div>
            </a>

            <a href="https://openledger.info/" target="_blank" rel="noopener noreferrer" className="card card-sm">
              <div className="card-header d-none d-md-block text-center">
                <img src={logoOpenledger} alt="Open Ledger" className="img-fluid"/>
              </div>

              <div className="card-body d-flex flex-column small">
                <h6 className="card-title text-muted">
                  <img src={logoOpenledger} alt="Open Ledger" className="d-md-none"/>
                  Open Ledger
                  <i className="mdi mdi-24px mdi-chevron-right d-md-none"></i>
                </h6>
              </div>
            </a>

            <a href="https://forkdelta.github.io/" target="_blank" rel="noopener noreferrer" className="card card-sm">
              <div className="card-header d-none d-md-block text-center">
                <img src={logoForkdelta} alt="ForkDelta" className="img-fluid"/>
              </div>

              <div className="card-body d-flex flex-column small">
                <h6 className="card-title text-muted">
                  <img src={logoForkdelta} alt="ForkDelta" className="d-md-none"/>
                  ForkDelta
                  <i className="mdi mdi-24px mdi-chevron-right d-md-none"></i>
                </h6>
              </div>
            </a>

          </div>

        </div>
      </div>
    </div>
  </article>
);

export default LifSection;
