import React from 'react';

export default class CollaborationSection extends React.Component {

  render() {

    return (
      <article className="section-wrapper" style={{
        position: 'relative',
        boxShadow: '0 5px 30px rgba(0,0,0,.05) inset',
        padding: '150px 0',
      }}>
        <div className="d-none d-lg-block" style={{
          opacity: .7,
          position: 'absolute',
          top: '0', left: '0', bottom: '0', right: '0',
          backgroundImage: 'url(https://windingtree.com/assets/img/banners/lif-token-bg.svg)',
          backgroundPosition: 'right center, left center',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: 'contain, auto',
        }}></div>
          <div className="container">
              <div className="row">
                <div className="col-12 col-lg-6 pr-lg-5">
                  <p className="mb-1 lead"><b>Winding Tree</b> provides ETH Berlin accomodation services together with our partner Botique Hotel i31.</p>
                  <p className="h4"><b>We offer a 20% discount to hackers and engineers who pay by <a href="#paying-with-lif">Lif token</a></b>.</p>
                </div>
              </div>
            </div>

      </article>
    );
  }

}
