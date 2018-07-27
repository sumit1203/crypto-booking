import React from 'react';

export default class CollaborationSection extends React.Component {

  render() {

    return (
      <article className="section-wrapper"
      style={{
        backgroundImage: 'url(https://windingtree.com/assets/img/banners/lif-token-bg.svg)',
        backgroundPosition: 'right center, left center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: 'contain, auto',
        boxShadow: '0 5px 30px rgba(0,0,0,.05) inset',
        padding: '110px 0',
      }}>
        <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-10 pr-5">
                <p className="mb-1 mt-1 lead">Winding Tree provides ETH Berlin accomodation services together with our partner Botique Hotel i31.</p>
                <p className="mb-1 h4"><b>We offer hackers and engineers a discount of 20% if paying by <a href="/">Lif tokens</a></b>.</p>
              </div>
            </div>
          </div>

      </article>
    );
  }

}
