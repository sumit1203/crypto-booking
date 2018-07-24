import React from 'react';

import logoEB from '../../img/content/logo-ethberlin.png';
import logoI31 from '../../img/content/logo-hotel-i-31.jpg';
import logoWTmd from '../../../node_modules/windingtree-media-web/logo-variants/full-logo/svg/logo--white_white-text--md.svg';
import logoWTsm from '../../../node_modules/windingtree-media-web/logo-variants/sign/svg/sign--white_white-text--sm.svg';

const Footer = () => (
  <footer class="footer bg--purple text-white">
    <div class="container">

      <div class="pt-2 pb-1">

        <div class="row">

          <div class="col-md-4">
            <img src={logoWTsm} alt="Winding Tree" class="d-md-none mb-2"/>
            <img src={logoWTmd} height="60" alt="Winding Tree" class="d-none d-md-inline"/>
          </div>

          <div class="col-md-8">
            <div class="row">

              <div class="col-6 col-sm-6 col-md-6 col-lg-8">
                <nav class="nav flex-column small mb-1">
                  <a href="/" class="nav-link px-0 text-white text--alpha-inverse">Book a room</a>
                  <a href="/" class="nav-link px-0 text-white text--alpha-inverse">Paying with Lif</a>
                  <a href="/" class="nav-link px-0 text-white text--alpha-inverse">My booking</a>
                </nav>
              </div>

              <div class="col-6 col-sm-6 col-md-6 col-lg-4">
                <div className="row">
                  <div className="col-8">
                    <a href="/startups-and-developers.html" class="nav-link px-0 text--alpha-inverse">
                      <img src={logoEB} alt="ETH Berlin" className="img-fluid"/>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="/startups-and-developers.html" class="nav-link px-0 text--alpha-inverse">
                      <img src={logoI31} alt="I-31 Hotel" className="img-fluid"/>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <hr class="text--alpha"/>

      <div class="py-1">
        <div class="d-flex flex-column-reverse flex-md-row align-items-center">
          <div class="d-flex flex-column flex-md-row align-items-center align-items-md-baseline">
            <small>©&nbsp;2017–<script>document.write(new Date().getFullYear());</script>2018, Winding Tree</small>
          </div>

          <div class="mb-1 mb-md-0 ml-md-auto">
            <ul class="social list-inline text-center text-md-right">

              <li class="list-inline-item">
                <a href="https://github.com/windingtree" title="GitHub" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-github-circle"></i>
                </a>
              </li>

              <li class="list-inline-item">
                <a href="https://twitter.com/windingtree" title="Twitter" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-twitter"></i>
                </a>
              </li>

              <li class="list-inline-item">
                <a href="http://blog.windingtree.com/" title="Medium" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-medium"></i>
                </a>
              </li>

              <li class="list-inline-item">
                <a href="https://www.youtube.com/channel/UCFuemEOhCfenYMoNdjD0Aew" title="YouTube" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-youtube"></i>
                </a>
              </li>

              <li class="list-inline-item">
                <a href="https://t.me/windingtree" title="Telegram" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-telegram"></i>
                </a>
              </li>

              <li class="list-inline-item">
                <a href="https://reddit.com/r/windingtree" title="Reddit" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-reddit"></i>
                </a>
              </li>

              <li class="list-inline-item">
                <a href="https://bitcointalk.org/index.php?topic=1946065" title="BitcoinTalk" className="text-white text--alpha">
                  <i class="mdi mdi-24px mdi-bitcoin"></i>
                </a>
              </li>

            </ul>


          </div>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
