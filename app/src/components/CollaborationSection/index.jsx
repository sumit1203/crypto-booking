import React from 'react';

export default class CollaborationSection extends React.Component {

  render() {

    return (
      <article className="section-wrapper py-5" style={{
        boxShadow: '0 5px 30px rgba(0,0,0,.05) inset',
        //padding: '150px 0',
      }}>
          <div className="container py-lg-1">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 text-center">
                  <p className="mb-1 h3">Winding Tree provides ETH Berlin accomodation services together with our partner Botique Hotel i31.</p>
                  <p className="h4"style={{fontWeight: 'normal'}}>We offer a <b>20% discount</b> to hackers and engineers who pay with <a href="#paying-with-lif">Lif token</a>.</p>
                </div>
              </div>


            </div>

      </article>
    );
  }

}
