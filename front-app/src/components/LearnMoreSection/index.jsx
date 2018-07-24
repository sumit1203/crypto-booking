import React from 'react';

const LearnMoreSection = () => (
  <article class="py-3 py-md-5 XXXbg--gradient-ri"
  style={{
    backgroundImage: 'url(https://windingtree.com/assets/img/layouts/ready-to-use/bg.png),radial-gradient(circle at 50% 0, #29cb96, #5f2987 66.6%)',
    backgroundPosition: 'center bottom, bottom center',
    backgroundRepeat: 'no-repeat, no-repeat',
  }}
  >
    <div class="container">

      <div class="row justify-content-center text-center">
        <div class="col-md-8">
          <h2 class="mb-1 text-white">
            Learn more about Winding Tree
          </h2>
          <p class="mb-1 mb-md-2 text-white">
            Check our website and meet oru engineers on ETH Berlin
          </p>
          <footer>
            <a href="https://windingtree.com" class="btn btn-outline-light">
              Learn more about Winding Tree
            </a>
          </footer>
        </div>
      </div>

    </div>
  </article>
);

export default LearnMoreSection;
