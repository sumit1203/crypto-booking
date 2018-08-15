import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default class CollaborationSection extends React.Component {

  render() {

    return (
      <article className="section-wrapper py-5">
          <div className="container py-lg-1">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 text-center">
                  <p className="mb-1 h3">
                    Winding Tree provides ETH Berlin accomodation services together with our
                    partner Botique Hotel i31.
                  </p>
                  <p className="h4 lead">
                    We offer a <b>20% discount</b> to hackers and engineers
                    who pay with <AnchorLink href="#paying-with-lif">Lif token</AnchorLink>.
                  </p>
                </div>
              </div>


            </div>

      </article>
    );
  }

}
