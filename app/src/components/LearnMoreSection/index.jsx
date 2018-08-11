import React from 'react';

const LearnMoreSection = () => (
  <article className="py-3 py-md-5"
  style={{
    backgroundImage: 'url(https://windingtree.com/assets/img/layouts/ready-to-use/bg.png),radial-gradient(circle at 50% -30%, #29cb96, #5f2987 66.6%)',
    backgroundPosition: 'center bottom, bottom center',
    backgroundRepeat: 'no-repeat, no-repeat',
  }}
  >
    <div className="container">

      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="mb-1 text-white">
            Learn more about Winding Tree
          </h2>
          <p className="mb-1 mb-md-2 text-white">
            Check our website and meet our engineers on ETH Berlin
          </p>
          <footer>
            <a href="https://windingtree.com" target='_blank' rel='noopener noreferrer' className="btn btn-outline-light d-none d-sm-inline-block">
            Visit Winding Tree website
            </a>
            <a href="https://windingtree.com" target='_blank' rel='noopener noreferrer' className="btn btn-outline-light d-inline-block d-sm-none">
            Visit our website
            </a>
          </footer>
        </div>
      </div>

    </div>
  </article>
);

export default LearnMoreSection;
