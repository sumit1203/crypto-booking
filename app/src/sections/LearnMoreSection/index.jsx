import React from 'react';

const LearnMoreSection = () => (
  <article id="learn-more" className="py-3 py-md-5">
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
            <a href="https://windingtree.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light d-none d-sm-inline-block">
            Visit Winding Tree website
            </a>
            <a href="https://windingtree.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light d-inline-block d-sm-none">
            Visit our website
            </a>
          </footer>
        </div>
      </div>

    </div>
  </article>
);

export default LearnMoreSection;
